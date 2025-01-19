import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';



@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const createdCategory = new this.categoryModel(createCategoryDto);
        return createdCategory.save();
      }
    
    async findAll(): Promise<Category[]> {
        return this.categoryModel.find().exec();
      }

    async findOne(id:string): Promise<Category> {
    return this.categoryModel.findById(id).exec();
    } 

    updateCategory(id: string, updateCategoryDto: UpdateCategoryDto){
        return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new:true });
    }
    
    deleteCategory(id: string) {
        return this.categoryModel.findByIdAndDelete(id).exec();
      }
}