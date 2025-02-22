import { IsString, IsInt, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  productSku: string;
  @ApiProperty()
  @IsString()
  productName: string;
  @ApiProperty()
  @IsInt()
  productPrice: number;
  @ApiProperty()
  @IsString()
  productShortName: string;
  @ApiProperty()
  @IsString()
  ProductDescription: string;
 /* @ApiProperty()
  @IsDate()
  LocalDateTime: Date;*/
  @ApiProperty()
  @IsString()
  deliveryTimeSpan:string;
  @ApiProperty()
  @IsInt()
  categoryId: number;
  @ApiProperty()
  @IsString()
  categoryName: string;
  @ApiProperty()
  @IsString()
  productImageUrl: string;
}