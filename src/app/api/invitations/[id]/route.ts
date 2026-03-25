import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { ApiResponse } from '@/types';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'No autenticado' },
      }, { status: 401 });
    }

    const body = await req.json();
    const { status } = body;

    if (!['accepted', 'rejected'].includes(status)) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: { code: 'INVALID_STATUS', message: 'Estado inválido' },
      }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('agency_invitations')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json<ApiResponse>({
      success: true,
      data,
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>({
      success: false,
      error: { code: 'UPDATE_FAILED', message: error.message },
    }, { status: 500 });
  }
}
