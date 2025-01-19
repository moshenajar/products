import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Patch, Post, Put, Req, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { LoggingInterceptor } from 'src/common/interceptor/logging.interceptor';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './schemas/category.schema';
import mongoose from 'mongoose';

@Controller('categories')
@UseInterceptors(LoggingInterceptor)
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    async findAll():Promise<Category[]> {
        return  this.categoriesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Category not found', 404);
        const findCategory = await this.categoriesService.findOne(id);
        if (!findCategory) throw new HttpException('Category not found', 404);
        return findCategory;
    }


    @Post()
    @HttpCode(204)
    @UsePipes(new ValidationPipe)
    create(@Body() createCategoryDto: CreateCategoryDto) {
        //console.log('create');
        this.categoriesService.create(createCategoryDto);
    }

    @Delete(':id')
    async deleteCategory(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Invalid ID', 400);
        const deleteCategory = await this.categoriesService.deleteCategory(id);
        if (!deleteCategory) throw new HttpException('Category Not Found', 404);
        return;
    }

    @Patch(':id')
    //@ProductPipes(new ValidationPipe())
    async updateProduct(
        @Param('id') id: string, 
        @Body() updateCategoryDto: UpdateCategoryDto
    ) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Invalid ID', 400);
        const updateCategory = await this.categoriesService.updateCategory(id, updateCategoryDto);
        if (!updateCategory) throw new HttpException('Category Not Found', 404);
        return updateCategory;
    }

}