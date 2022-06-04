import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  subtitle: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUrl()
  @IsNotEmpty()
  imgURL: string;

  @IsString()
  @IsNotEmpty()
  imgAlt: string;
}
