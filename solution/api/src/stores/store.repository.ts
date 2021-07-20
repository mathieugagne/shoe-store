import { Store } from './store.entity';
import { EntityRepository, Repository } from 'typeorm';


@EntityRepository(Store)
export class StoreRepository extends Repository<Store> {}
