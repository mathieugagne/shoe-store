import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './typeorm.config';
import { StoresModule } from './stores/stores.module';
import { EventsModule } from './events/events.module';
import { ProductsModule } from './products/products.module';
import { InventoryModule } from './inventory/inventory.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    StoresModule,
    EventsModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    ProductsModule,
    InventoryModule,
    ConfigModule.forRoot({isGlobal: true})
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
