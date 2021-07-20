import { InventoryRepository } from './inventory.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryRepository])]
})
export class InventoryModule {}
