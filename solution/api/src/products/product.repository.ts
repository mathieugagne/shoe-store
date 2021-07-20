import { Product } from 'src/products/product.entity';
import { Inventory } from 'src/inventory/inventory.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Store } from 'src/stores/store.entity';

type ProductResponse = {
    product_id: number,
    product_name: string,
    product_unit_price: number,
    product_created_at: Date,
    product_updatedAt: Date,
    units_in_stock: number,
    store_id: number,
    store_name: string,
}
@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  getProductsInventory(): Promise<ProductResponse[]> {
    return (
      this.createQueryBuilder('product')
        .select('product')
        .addSelect('store.id', 'store_id')
        .addSelect('store.name', 'store_name')
        .addSelect('inventory.units_in_stock', 'units_in_stock')
        .innerJoin(Inventory, 'inventory', 'product.id = inventory.product_id')
        .innerJoin(Store, 'store', 'inventory.store_id = store.id')
        .orderBy('units_in_stock')
        .getRawMany()
    );
  }
}
