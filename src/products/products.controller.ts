import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Patch, Post, Put, Req, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { LoggingInterceptor } from 'src/common/interceptor/logging.interceptor';
import { CreateProductDto } from './dto/create-product.dto';
//import { Product } from './schemas/product.schema';
import mongoose from 'mongoose';
import { InventoryDto } from './dto/inventory.dto';
import { Product } from './schemas/product.schema';

@Controller('products')
@UseInterceptors(LoggingInterceptor)
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async findAll():Promise<Product[]> {
        return  this.productsService.findAll();
    }

    @Get(':productID')
    async findOne(@Param('productID') productID: number) {
        //const isValid = mongoose.Types.ObjectId.isValid(productID);
        //if (!isValid) throw new HttpException('Product not found', 404);
        const findProduct = await this.productsService.findOne(productID);
        if (!findProduct) throw new HttpException('Product not found', 404);
        return findProduct;
    }


    @Post()
    @HttpCode(204)
    @UsePipes(new ValidationPipe)
    create(@Body() createProductDto: CreateProductDto) {
        console.log('create');
        this.productsService.create(createProductDto);
    }

    @Delete(':productID')
    async deleteProduct(@Param('productID') productID: number) {
        //const isValid = mongoose.Types.ObjectId.isValid(id);
        //if (!isValid) throw new HttpException('Invalid ID', 400);
        const deleteProduct = await this.productsService.deleteProduct(productID);
        if (!deleteProduct) throw new HttpException('Product Not Found', 404);
        return;
    }

    @Patch(':productID')
    //@ProductPipes(new ValidationPipe())
    async updateProduct(
        @Param('productID') productID: number, 
        @Body() updateProductDto: UpdateProductDto
    ) {
        //const isValid = mongoose.Types.ObjectId.isValid(id);
        //if (!isValid) throw new HttpException('Invalid ID', 400);
        //(await this.findOne(productID)).
        const updateProduct = await this.productsService.updateProduct(productID, updateProductDto);
        if (!updateProduct) throw new HttpException('Product Not Found', 404);
        return updateProduct;
    }

    @Post('product-inventory')
    productInventory(@Body() inventoryDto: InventoryDto){
        return this.productsService.productInventory(inventoryDto);
    }
}