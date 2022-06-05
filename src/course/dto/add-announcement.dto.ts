import { IsNotEmpty, IsString } from 'class-validator';

export class AddAnnouncementDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
