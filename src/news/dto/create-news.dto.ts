import { IsArray, IsDateString, IsString } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  name: string;

  @IsString()
  author: string;

  @IsString()
  text: string;

  @IsDateString()
  publicationDate: Date;

  @IsArray()
  tags: number[];
}
