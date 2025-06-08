import { Module } from '@nestjs/common';
import { CurrencyService } from '@/currency/currency.service';
import { CurrencyController } from '@/currency/currency.controller';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService],
  exports: [CurrencyService],
})
export class CurrencyModule {}
