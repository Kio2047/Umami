import { z } from "zod";

export const getImageUploadSignatureSchema = {
  params: z.object({
    folder: z.enum(["profile_images", "post_images"])
  })
};
