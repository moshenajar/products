
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<ProductItem>;


@Schema()
export class ProductItem {
    @Prop()
    productID:number;
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

export const ProductItemSchema = SchemaFactory.createForClass(ProductItem);


@Schema()
export class Product {
    @Prop()
    ban: number;
    @Prop()
    status: number;
    @Prop({ type: ProductItemSchema} )
    product:ProductItem;
}

export const ProductSchema = SchemaFactory.createForClass(Product);