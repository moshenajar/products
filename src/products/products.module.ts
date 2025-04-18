import { Module } from '@nestjs/common';
import { MongooseModule, getConnectionToken  } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { AuthService } from '../guards/auth.service';
import { Product, ProductSchema } from './schemas/product.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Connection } from 'mongoose';
import { HttpModule } from '../http.module';


@Module({
  imports: [
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
    ]),
    HttpModule.forFeature({
      serviceName: 'CustomHttpService',
      config: {
        baseURL: 'http://localhost:3012',
        enableLogging: true,
      },
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, AuthService],
})
export class ProductsModule {}