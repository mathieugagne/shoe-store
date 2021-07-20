import { ProductRepository } from './product.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(private productRepository: ProductRepository) {}
  getAllProducts() {
    return this.productRepository.getProductsInventory();
  }
}
