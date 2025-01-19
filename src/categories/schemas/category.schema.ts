
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

/*
"categoryId": number;
    "categorySku": string;
    "categoryName": string;
    "categoryShortName": string;
    "categoryDescription": string;
    "createdDate": Date;
    "categoryImageUrl": string;
    "userId": number;
*/
@Schema()
export class Category {

    @Prop()
    categoryId: number;

    @Prop()
    categorySku: string;

    @Prop()
    categoryName: string;

    @Prop()
    categoryShortName: string;

    @Prop()
    categoryDescription: string;

    @Prop()
    createdDate: Date;

    @Prop()
    categoryImageUrl:string;

    @Prop()
    userId: number;
    
}

export const CategorySchema = SchemaFactory.createForClass(Category);
