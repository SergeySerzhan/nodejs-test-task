import { FileValidator } from '@nestjs/common';

import { MimeTypes } from '../utils/mime-types';

type FileSizeValidationOptions = {
  fileType: MimeTypes[];
};

type ImageFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: MimeTypes;
  buffer: string;
  size: number;
};

export class FileSizeValidator extends FileValidator<FileSizeValidationOptions> {
  isValid(file?: ImageFile): boolean {
    return this.validationOptions.fileType?.includes(file.mimetype);
  }

  buildErrorMessage(file: any): string {
    return `The mime type(${file.mimetype}) of file ${
      file.originalname
    } is not in supported array ${Object.values(MimeTypes)}`;
  }
}
