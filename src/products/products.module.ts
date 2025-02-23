import { Module } from '@nestjs/common';
import { MongooseModule, getConnectionToken  } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './schemas/product.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Connection } from 'mongoose';


@Module({
  imports: [
    //MongooseModule.forRoot('mongodb://localhost:28017/products'),
    //MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    /*MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        useFactory: () => {
          const schema = ProductSchema;
          schema.plugin(require('mongoose-sequence'));
          return schema;
        },
      },
    ]),*/
    MongooseModule.forFeatureAsync([
        {
          name: Product.name,
            useFactory: async (connection: Connection) =>{
                const schema = ProductSchema;
                const AutoIncrement = require('mongoose-sequence')(connection)
                schema.plugin(AutoIncrement, {
                  id: 'product_create_seq',
                  inc_field: 'product.productID',
                  start_seq: 1000000
                });
                return schema;
            },
            inject: [getConnectionToken(process.env.DATA_BASE_URI)]
        }
    ]),
    ClientsModule.register([
      {
        name: 'INVENTORY_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'inventory-queue',
        }
      },
    ])
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}