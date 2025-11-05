import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from '../auth/auth.module';
import { OrdersModule } from 'src/orders/orders.module';
import { StepsModule } from 'src/order-steps/order-steps.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [AuthModule, OrdersModule, StepsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
