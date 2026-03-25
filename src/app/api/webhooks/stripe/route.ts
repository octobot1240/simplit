import { NextRequest, NextResponse } from 'next/server';
import { stripe, isStripeEnabled } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  if (!isStripeEnabled || !stripe) {
    return new NextResponse('Stripe not enabled', { status: 503 });
  }

  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.supabase_user_id;

        if (userId && session.subscription) {
          const sub = await stripe.subscriptions.retrieve(
            session.subscription as string
          );

          await supabaseAdmin.from('subscriptions').update({
            stripe_subscription_id: sub.id,
            plan: sub.items.data[0].price.recurring?.interval === 'year' 
              ? 'premium_annual' 
              : 'premium_monthly',
            status: 'active',
            current_period_start: new Date((sub as any).current_period_start * 1000).toISOString(),
            current_period_end: new Date((sub as any).current_period_end * 1000).toISOString(),
          }).eq('user_id', userId);

          await supabaseAdmin.from('profiles').update({
            profile_visible: true,
          }).eq('id', userId);
        }
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        const userId = sub.metadata?.supabase_user_id;

        if (userId) {
          const status = sub.status === 'active' ? 'active' 
            : sub.status === 'canceled' ? 'canceled'
            : sub.status === 'past_due' ? 'past_due'
            : 'canceled';

          await supabaseAdmin.from('subscriptions').update({
            status,
            current_period_start: new Date((sub as any).current_period_start * 1000).toISOString(),
            current_period_end: new Date((sub as any).current_period_end * 1000).toISOString(),
          }).eq('user_id', userId);

          if (status !== 'active') {
            await supabaseAdmin.from('profiles').update({
              profile_visible: false,
            }).eq('id', userId);
          }
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    return new NextResponse(`Webhook Handler Error: ${error.message}`, { status: 500 });
  }
}
