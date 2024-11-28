import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryProvider {
  async uploadToCloudinary(file: Express.Multer.File) :Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        )
        .end(file.buffer);
    });
  }
}
