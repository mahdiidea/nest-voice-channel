import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments,useContainer } from 'class-validator';
import { Injectable } from "@nestjs/common";
import { UserService } from '../user/user.service';

@Injectable()
@ValidatorConstraint({ name: 'userEmailValidation', async: false })
export class UserEmailValidation implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(email: string, args: ValidationArguments) {
    return await this.userService.findByEmail(email) == null;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email already exist';
  }
}