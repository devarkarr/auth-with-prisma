import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryProvider } from '../provider/cloudinary-provider/cloudinary-provider';
import { Upload } from '../entities/upload.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { fileTypes } from '../enums/file-types.enum';
import { UploadFile } from '../interfaces/upload-file.interface';

@Injectable()
export class UploadsService {
  constructor(
    private readonly cloudinaryProvider: CloudinaryProvider,
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
  ) {}

  async upload(file: Express.Multer.File) {
    // throw error for unsupported file types
    if (
      !['image/gif', 'image/jpeg', 'image/jpg', 'image/png'].includes(
        file.mimetype,
      )
    ) {
      throw new BadRequestException('MIME type not supported');
    }

    try {
      // Upload file to AWS S3 bucket
      const path = await this.cloudinaryProvider.uploadToCloudinary(file);
      //Generate a new record in upload table
      const uploadFile: UploadFile = {
        name: path.original_filename,
        path: path?.url,
        type: fileTypes.IMAGE,
        mime: file.mimetype,
        size: file.size,
      };
      // create an upload
      const upload = this.uploadRepository.create(uploadFile);
      // save the details to database
      return await this.uploadRepository.save(upload);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
