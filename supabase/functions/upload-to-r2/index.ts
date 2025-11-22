import { S3Client, PutObjectCommand } from "https://esm.sh/@aws-sdk/client-s3@3.592.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface UploadRequest {
  file: {
    name: string;
    type: string;
    base64: string;
  };
  folder?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Upload request received');
    
    const { file, folder = 'uploads' }: UploadRequest = await req.json();
    
    if (!file || !file.base64 || !file.name || !file.type) {
      console.error('Missing required file data');
      return new Response(
        JSON.stringify({ error: 'Missing required file data' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize R2 client
    const r2Client = new S3Client({
      region: "auto",
      endpoint: Deno.env.get('R2_ENDPOINT'),
      credentials: {
        accessKeyId: Deno.env.get('R2_ACCESS_KEY_ID') || '',
        secretAccessKey: Deno.env.get('R2_SECRET_ACCESS_KEY') || '',
      },
    });

    // Generate unique filename
    const fileExtension = file.name.split('.').pop();
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const fileName = `${folder}/${timestamp}-${randomStr}.${fileExtension}`;
    
    console.log(`Uploading file: ${fileName}`);

    // Convert base64 to Uint8Array
    const base64Data = file.base64.split(',')[1] || file.base64;
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Upload to R2
    const command = new PutObjectCommand({
      Bucket: Deno.env.get('R2_BUCKET_NAME'),
      Key: fileName,
      Body: bytes,
      ContentType: file.type,
    });

    await r2Client.send(command);
    console.log('File uploaded successfully to R2');

    // Construct public URL
    const publicUrl = `${Deno.env.get('R2_PUBLIC_URL')}/${fileName}`;

    return new Response(
      JSON.stringify({ 
        success: true, 
        url: publicUrl,
        fileName: fileName 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Upload error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Upload failed', 
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
