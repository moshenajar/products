
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {

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

export const ProductSchema = SchemaFactory.createForClass(Product);
