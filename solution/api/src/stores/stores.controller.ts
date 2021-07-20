import { Store } from './store.entity';
import { StoresService } from './stores.service';
import { Controller, Get, Logger, Param } from '@nestjs/common';

@Controller('stores')
export class StoresController {
  private logger = new Logger('StoresController');

  constructor(private storesService: StoresService) {}

  @Get()
  getAllStores(): Promise<[Store[], number]> {
    this.logger.log('getAllStores');

    return this.storesService.getAllStores();
  }
}
