import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

export class ValidationPipe implements PipeTransform<any> {
      async transform(value: any, { metatype }: ArgumentMetadata) {
            if (!metatype || !this.toValidate(metatype)) {
                  return value
            }

            const object = plainToClass(metatype, value)
            const errors = await validate(object)

            if (errors.length > 0) {
                  let array = {};
                  let raw = [];
                  for (let i = 0; i < errors.length; i++) {
                        array[errors[i].property] = Object.keys(errors[i].constraints).map(function (key) {
                              raw.push(errors[i].constraints[key]);
                              return errors[i].constraints[key];
                        });
                  }

                  throw new BadRequestException({
                        message: raw.length > 0 ? (raw.length > 1 ? `${raw[0]}. (and ${raw.length - 1} more ${raw.length == 2 ? 'error' : 'errors'})` : raw[0]) : 'Bad request',
                        errors: array
                  })
            }
            return value;
      }

      private toValidate(metatype: Function): boolean {
            const types: Function[] = [String, Boolean, Number, Array, Object]
            return !types.includes(metatype)
      }
}