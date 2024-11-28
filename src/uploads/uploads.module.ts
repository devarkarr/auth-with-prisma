import { Module } from '@nestjs/common';
import { UploadsService } from './services/uploads.service';
import { UploadsController } from './uploads.controller';
import { CloudinaryProvider } from './provider/cloudinary-provider/cloudinary-provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './entities/upload.entity';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService, CloudinaryProvider],
  imports: [TypeOrmModule.forFeature([Upload])],
})
export class UploadsModule {}
