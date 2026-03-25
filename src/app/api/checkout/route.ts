import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { stripe, isStripeEnabled } from '@/lib/stripe';
import type { ApiResponse } from '@/types';

export async function POST(req: NextRequest) {
  try {
    if (!isStripeEnabled || !stripe) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: { code: 'STRIPE_DISABLED', message: 'Stripe no está configurado' },
      }, { status: 503 });
    }

    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'No autenticado' },
      }, { status: 401 });
    }

    const body = await req.json();
    const { priceId } = body;

    if (!priceId) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: { code: 'MISSING_PRICE_ID', message: 'Price ID requerido' },
      }, { status: 400 });
    }

    // Get or create Stripe customer
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single();

    let customerId = subscription?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;

      await supabase
        .from('subscriptions')
        .update({ stripe_customer_id: customerId })
        .eq('user_id', user.id);
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/panel/ajustes?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/panel/ajustes?canceled=true`,
      metadata: { supabase_user_id: user.id },
    });

    return NextResponse.json<ApiResponse>({
      success: true,
      data: { url: session.url },
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>({
      success: false,
      error: { code: 'CHECKOUT_FAILED', message: error.message },
    }, { status: 500 });
  }
}
