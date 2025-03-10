import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ProductsController } from './products/products.controller';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    MongooseModule.forRootAsync({
      //imports: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const options: MongooseModuleOptions = {
          uri : configService.get('database.url'),
        };
        return options;
      },
      inject: [ConfigService],
    }),
    ProductsModule,
    CategoriesModule,
    ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(ProductsController, CategoriesModule);
  }
}
