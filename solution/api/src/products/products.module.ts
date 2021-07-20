import { ProductsController } from './products.controller';
import { ProductRepository } from 'src/products/product.repository';
import { ProductsService } from './products.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository])],
  controllers: [ProductsController],

  providers: [ProductsService],
})
export class ProductsModule {}
