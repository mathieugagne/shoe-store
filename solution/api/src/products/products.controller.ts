import { ProductsService } from './products.service';
import { Controller, Get, Logger } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    private logger = new Logger('ProductsController');

    constructor(private productsService: ProductsService) {}

    @Get()
    getAllProducts(): Promise<any> {
      this.logger.log('getAllProducts');

      return this.productsService.getAllProducts();
    }
}
