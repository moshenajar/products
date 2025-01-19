import { IsString, IsInt, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty()
  @IsInt()
  "categoryId": number;
  @ApiProperty()
  @IsString()
  "categorySku": string;
  @ApiProperty()
  @IsString()
  "categoryName": string;
  @ApiProperty()
  @IsString()
  "categoryShortName": string;
  @ApiProperty()
  @IsString()
  "categoryDescription": string;
  @ApiProperty()
  @IsDate()
  "createdDate": Date;
  @ApiProperty()
  @IsString()
  "categoryImageUrl": string;
  @ApiProperty()
  @IsInt()
  "userId": number;
  }