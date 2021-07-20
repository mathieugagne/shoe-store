import { InventoryModule } from './../inventory/inventory.module';
import { Inventory } from 'src/inventory/inventory.entity';
import { EventsService } from './events.service';
import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [InventoryModule, TypeOrmModule.forFeature([Inventory])],
  providers: [EventsGateway, EventsService],
})
export class EventsModule {}
