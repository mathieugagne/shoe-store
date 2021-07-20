import { StoreRepository } from './store.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StoresService {
  constructor(private storeRepository: StoreRepository) {}
  getAllStores() {
    return this.storeRepository.findAndCount();
  }
}
