import { InventoryRepository } from './../inventory/inventory.repository';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EventsGateway } from './events.gateway';

// this is just to simulate periodic task, for example listening to inventory changes.
@Injectable()
export class EventsService {
  constructor(
    private gateway: EventsGateway,
    private inventoryRepository: InventoryRepository,
  ) {}

  private readonly logger = new Logger('EventsService');

  private randomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  @Cron('*/10 * * * * *')
  async handleCron() {
    this.logger.debug('Called when the current second is 10');

    const updated = await this.inventoryRepository.updateInventory({
        // simulate inventory changes
      product_id: 1,
      store_id: 1,
      units_in_stock: this.randomInteger(1, 10),
    });

    this.logger.debug(JSON.stringify(updated));

    await this.gateway.newNotification({updated});
  }
}
