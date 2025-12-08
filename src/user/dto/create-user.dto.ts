import {
    IsEmail,
    IsString,
    IsNotEmpty,
    MinLength,
    IsOptional,
    MaxLength
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MaxLength(9)
  firstName: string;

  @IsString()
  @MaxLength(9)
  lastName: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}
