import { UploadApiResponse, UploadStream } from "cloudinary";
import { Readable } from "stream";
import cloudinary from "./cloudinary.config.ts";

export const uploadToCloudinary = (
  buffer: Buffer,
  folder: string,
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resourse_type: "auto",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve(result);
        }
      },
    );
    Readable.from(buffer).pipe(uploadStream);
  });
};
