import { IsString, IsInt, IsDate, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { InventoryDto } from './inventory.dto';

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
  @ApiProperty()
  @IsBoolean()
  isInventoryManagementRequired:boolean;
  @ApiProperty()
  inventoryData?:InventoryDto
}