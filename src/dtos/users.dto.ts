import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @Length(10, 10)
  public phoneNumber: string;

  @IsString()
  public name: string;
}
