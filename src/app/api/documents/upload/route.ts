import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { ApiResponse } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'No autenticado' },
      }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const docType = formData.get('doc_type') as string;

    if (!file || !docType) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: { code: 'MISSING_FIELDS', message: 'Archivo y tipo de documento requeridos' },
      }, { status: 400 });
    }

    // Upload file to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${docType}-${Date.now()}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('documents')
      .getPublicUrl(fileName);

    // Create document record
    const { data: document, error: dbError } = await supabase
      .from('documents')
      .insert({
        user_id: user.id,
        doc_type: docType,
        file_name: file.name,
        file_url: publicUrl,
        file_size: file.size,
        status: 'pending',
      })
      .select()
      .single();

    if (dbError) throw dbError;

    // TODO: Trigger AI verification here
    // For now, we'll auto-verify after 2 seconds (mock)
    setTimeout(async () => {
      await supabase
        .from('documents')
        .update({ status: 'verified' })
        .eq('id', document.id);
    }, 2000);

    return NextResponse.json<ApiResponse>({
      success: true,
      data: document,
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>({
      success: false,
      error: { code: 'UPLOAD_FAILED', message: error.message },
    }, { status: 500 });
  }
}
