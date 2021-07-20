import { Inventory } from 'src/inventory/inventory.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Inventory)
export class InventoryRepository extends Repository<Inventory> {
  updateInventory({product_id, store_id, units_in_stock}): Promise<any> {
    return this.createQueryBuilder('inventory')
      .update(Inventory)
      .set({ store_id, units_in_stock })
      .where('id = :id ', {
       id:product_id,
      })
      .returning('*')
      .execute()
      .then((response) => {
        return response.raw[0];
      });
  }
}
