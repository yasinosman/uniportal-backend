import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  lecturerId: number;

  @IsNotEmpty()
  @IsNumber()
  credit: number;

  @IsNotEmpty()
  @IsString()
  semester: string;
}
