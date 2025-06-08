import { Module } from '@nestjs/common';
import { ComparisonController } from './comparison.controller';
import { ComparisonService } from '@/comparison/comparison.service';

@Module({
  providers: [ComparisonService],
  controllers: [ComparisonController],
})
export class ComparisonModule {}
