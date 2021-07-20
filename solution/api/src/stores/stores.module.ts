import { EventsModule } from './../events/events.module';
import { StoreRepository } from './store.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { EventsGateway } from './../events/events.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([StoreRepository]), EventsModule],
  controllers: [StoresController],
  providers: [StoresService, EventsGateway],
})
export class StoresModule {}
