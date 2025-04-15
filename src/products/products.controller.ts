import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Put, Req, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { LoggingInterceptor } from 'src/common/interceptor/logging.interceptor';
import { CreateProductDto } from './dto/create-product.dto';
import { InventoryDto } from './dto/inventory.dto';
import { Product } from './schemas/product.schema';
import mongoose from 'mongoose';
import { IsNumber } from 'class-validator';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/guards/user.entity';
import { GetUser } from 'src/guards/get-user.decorator';
import { MessagePattern } from '@nestjs/microservices';

@Controller('products')
@UseInterceptors(LoggingInterceptor)
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}


    @MessagePattern('GetAllProducts')
    async GetAllProducts():Promise<Product[]> {
        return  this.productsService.findAll();
    }

    @Get()
    async findAll():Promise<Product[]> {
        return  this.productsService.findAll();
    }

    @Get(':productID')
    async findOne(@Param('productID') productID: number) {
        const findProduct = await this.productsService.findOne(productID);
        if (!findProduct) throw new HttpException('Product not found', 404);
        return findProduct;
    }


    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe)
    async create(@Body() createProductDto: CreateProductDto,@GetUser() user: User): Promise<number> {
        const product = await this.productsService.create(createProductDto);
        return product.product.productID;
    }

    @Delete(':productID')
    async deleteProduct(@Param('productID') productID: number) {
        const isValid = this.productsService.isNumber(productID);
        if (!isValid) throw new HttpException('Invalid ID', 400);
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
        const isValid = this.productsService.isNumber(productID);
        if (!isValid) throw new HttpException('Invalid ID', 400);
        const updateProduct = await this.productsService.updateProduct(productID, updateProductDto);
        if (!updateProduct) throw new HttpException('Product Not Found', 404);
        return updateProduct;
    }

    @Post('product-inventory')
    productInventory(@Body() inventoryDto: InventoryDto){
        return this.productsService.productInventory(inventoryDto);
    }
}