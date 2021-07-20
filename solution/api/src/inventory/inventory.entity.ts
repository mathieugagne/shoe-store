import { Product } from './../products/product.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Store } from 'src/stores/store.entity';

@Entity()
export class Inventory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => Product, (product) => product.id)
  @Column()
  product_id: number;

  @OneToOne((type) => Store, (store) => store.id)
  @Column()
  store_id: number;

  @Column()
  units_in_stock: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
