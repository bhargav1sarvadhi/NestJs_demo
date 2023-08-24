import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import * as Joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: Joi.Schema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);

    if (error) {
      const errorMessage = error.details[0].message;
      throw new BadRequestException(errorMessage);
    }
    return value;
  }
}
