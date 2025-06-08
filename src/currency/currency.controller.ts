import { Controller, Get } from '@nestjs/common';
import { CurrencyService, Currency } from '@/currency/currency.service';
import { Public } from '@/common/decorators/public.decorator';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly CurrencyService: CurrencyService) {}

  @Public()
  @Get('fiat')
  getFiatCurrencies(): Currency[] {
    return this.CurrencyService.getFiatCurrencies();
  }

  @Public()
  @Get('crypto')
  getCryptoCurrencies(): Currency[] {
    return this.CurrencyService.getCryptoCurrencies();
  }
}
