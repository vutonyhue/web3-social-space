import { supabase } from "@/integrations/supabase/client";

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: any;
}

/**
 * Convert file to base64
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Upload a file to Cloudflare R2 via Supabase Edge Function
 */
export async function uploadToR2(
  file: File,
  folder: string = "uploads",
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> {
  try {
    // Simulate initial progress
    if (onProgress) {
      onProgress({
        loaded: 0,
        total: file.size,
        percentage: 0,
      });
    }

    // Convert file to base64
    const base64 = await fileToBase64(file);
    
    if (onProgress) {
      onProgress({
        loaded: file.size * 0.3,
        total: file.size,
        percentage: 30,
      });
    }

    // Call edge function to upload to R2
    const { data, error } = await supabase.functions.invoke('upload-to-r2', {
      body: {
        file: {
          name: file.name,
          type: file.type,
          base64: base64,
        },
        folder: folder,
      },
    });

    if (error) {
      console.error("Edge function error:", error);
      throw error;
    }

    if (!data || !data.success) {
      throw new Error(data?.error || "Upload failed");
    }

    // Simulate completion progress
    if (onProgress) {
      onProgress({
        loaded: file.size,
        total: file.size,
        percentage: 100,
      });
    }

    return { success: true, url: data.url };
  } catch (error) {
    console.error("Upload failed:", error);
    return { success: false, error };
  }
}

/**
 * Validate file before upload
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  const MAX_SIZE = 100 * 1024 * 1024; // 100MB
  const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
  const ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES];

  if (file.size > MAX_SIZE) {
    return { valid: false, error: "File quá lớn. Kích thước tối đa là 100MB." };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: "Định dạng file không được hỗ trợ." };
  }

  return { valid: true };
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}
