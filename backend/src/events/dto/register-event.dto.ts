import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterEventDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;
}

