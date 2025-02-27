import mongoose, { Date, Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductItem } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxy, NestMicroservice } from '@nestjs/microservices';
import { InventoryDto } from './dto/inventory.dto';
import * as moment from 'moment';
import { log } from 'console';

const CREATE_INVENTORY_OF_PRODUCT  = 'CreateInventoryOfProduct';


@Injectable()
export class ProductsService {
    constructor(
      @InjectModel(Product.name) private productModel: Model<Product>,
      @Inject("INVENTORY_SERVICE") private rabbitClient: ClientProxy) {}

    async create(createProductDto: CreateProductDto): Promise<Product> {
      const LocalDateTime = new Date();
      const ban = 12345678
      const isInventoryManagementRequired = createProductDto.isInventoryManagementRequired;
      const product : ProductItem = { LocalDateTime,...createProductDto }
      let status:number = 1;
      const productCreator: Product = { ban,status,product,isInventoryManagementRequired };
      const createdProduct = new this.productModel(productCreator);
      await createdProduct.save();

      const result:Product = await createdProduct.toObject({ getters: true })
      
      if(result && isInventoryManagementRequired)
      {
        let inventoryDto: InventoryDto = createProductDto.inventoryData;
        inventoryDto.productId = result.product.productID;
        inventoryDto.ban = ban;
        this.rabbitClient.emit(CREATE_INVENTORY_OF_PRODUCT, inventoryDto);
      }
      return result;
    }
      
    async findAll(): Promise<Product[]> {
      return this.productModel.find().exec();
    }

    async findOne(productID:number): Promise<Product> {
      const query: any = { 'product.productID' : productID }
      return this.productModel.findOne(query).exec();
    } 
    

    updateProduct(productID: number, updateProductDto: UpdateProductDto){
      const LocalDateTime = new Date();
      const ban:number = 12345678
      const isInventoryManagementRequired:boolean = false;
      const status:number = 1;
      const product : ProductItem = {productID, LocalDateTime,...updateProductDto };
      const productCreator: Product = { ban,status,product,isInventoryManagementRequired };
      const query: any = { 'product.productID' : productID }
        //new:true return pruduct after update
        return this.productModel.findOneAndUpdate(query, productCreator, { new:true });
    }
    
    deleteProduct(productID: number) {
      const query: any = { 'product.productID' : productID }
        return this.productModel.findOneAndDelete(query).exec();
    }

    productInventory(inventoryDto: InventoryDto){
      this.rabbitClient.emit(CREATE_INVENTORY_OF_PRODUCT, inventoryDto);

      return { message: 'Product Inventort!' };
    }

    isNumber(value?: string | number): boolean
    {
      return ((value != null) &&
              (value !== '') &&
              !isNaN(Number(value.toString())));
    }

}
