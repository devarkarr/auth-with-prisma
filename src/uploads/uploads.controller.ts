import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadsService } from './services/uploads.service';
import { Auth } from 'src/auth/decorators/auth/auth.decorator';
import { AUTH_TYPE } from 'src/auth/enums/auth.enum';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiHeaders, ApiOperation } from '@nestjs/swagger';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  // File is the field name
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiHeaders([{ name: 'Content-Type', description: 'multipart/form-data' }])
  @ApiOperation({
    summary: `Upload a new image to the server`,
  })
  @ApiBearerAuth('BearerAuth')
  create(@UploadedFile() file: Express.Multer.File) {
    return this.uploadsService.upload(file);
  }
}
