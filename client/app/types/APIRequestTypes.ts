export interface ImageUploadRequest {
  folder: string;
  base64Image: string;
  timestamp: number;
  api_key: number;
  signature: string;
}
