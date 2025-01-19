import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxy } from '@nestjs/microservices';
import { InventoryDto } from './dto/inventory.dto';

const CREATE_INVENTORY_OF_PRODUCT  = 'CreateInventoryOfProduct';


@Injectable()
export class ProductsService {
    constructor(
      @InjectModel(Product.name) private productModel: Model<Product>,
      @Inject("INVENTORY_SERVICE") private rabbitClient: ClientProxy) {}

    async create(createProductDto: CreateProductDto): Promise<Product> {
        let product:Product = createProductDto;
        const createdProduct = new this.productModel(Product);
        return createdProduct.save();
      }
    
    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
      }

    async findOne(id:string): Promise<Product> {
    return this.productModel.findById(id).exec();
    } 

    updateProduct(id: string, updateProductDto: UpdateProductDto){
        return this.productModel.findByIdAndUpdate(id, updateProductDto, { new:true });
    }
    
    deleteProduct(id: string) {
        return this.productModel.findByIdAndDelete(id).exec();
    }

    productInventory(inventoryDto: InventoryDto){
      this.rabbitClient.emit(CREATE_INVENTORY_OF_PRODUCT, inventoryDto);

      return { message: 'Product Inventort!' };
    }
}