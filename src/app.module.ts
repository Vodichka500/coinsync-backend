import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ComparisonService } from './comparison/comparison.service';
import { ComparisonController } from './comparison/comparison.controller';
import { ComparisonModule } from './comparison/comparison.module';
import { CurrencyService } from './currency/currency.service';
import { CurrencyController } from './currency/currency.controller';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, ComparisonModule, CurrencyModule],
  providers: [ComparisonService, CurrencyService],
  controllers: [ComparisonController, CurrencyController],
})
export class AppModule {}
