import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsNumber } from 'class-validator';
import { CreateNewsDto } from './create-news.dto';

export class UpdateNewsDto extends PartialType(CreateNewsDto) {
  @IsNumber()
  id: number;

  @IsDateString()
  expiryDate: Date;
}
