
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
//const mongoose = require('mongoose');
//const AutoIncrement = require('mongoose-sequence')(mongoose);

import { HydratedDocument } from 'mongoose';
export type ProductDocument = HydratedDocument<Product>;




@Schema({ _id: false })
export class ProductItem {
    //productID:number;
    @Prop()
    productSku: string;
    @Prop()
    productName: string;
    @Prop()
    productPrice: number;
    @Prop()
    productShortName: string;
    @Prop()
    ProductDescription: string;
    @Prop()
    LocalDateTime: Date;
    @Prop()
    deliveryTimeSpan:string;
    @Prop()
    categoryId: number;
    @Prop()
    categoryName: string;
    @Prop()
    productImageUrl: string;
}



@Schema()
export class Product {
    @Prop()
    ban: number;
    @Prop()
    status: number;
    @Prop()
    product:ProductItem;
}


export const ProductSchema = SchemaFactory.createForClass(Product);
/*ProductSchema.plugin(AutoIncrement, {  
    id: 'product_create_seq',
    inc_field: 'product.productID'});*/
