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

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single();

    if (!subscription?.stripe_customer_id) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: { code: 'NO_CUSTOMER', message: 'Cliente de Stripe no encontrado' },
      }, { status: 404 });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/panel/ajustes`,
    });

    return NextResponse.json<ApiResponse>({
      success: true,
      data: { url: session.url },
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>({
      success: false,
      error: { code: 'PORTAL_FAILED', message: error.message },
    }, { status: 500 });
  }
}
