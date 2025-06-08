import { IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class CompareDto {
  @IsString()
  @IsNotEmpty()
  cryptoId!: string;
  @IsString()
  @IsNotEmpty()
  fiatSymbol!: string;
  @IsISO8601()
  @IsNotEmpty()
  startDate!: string;
  @IsISO8601()
  @IsNotEmpty()
  endDate!: string;
}
