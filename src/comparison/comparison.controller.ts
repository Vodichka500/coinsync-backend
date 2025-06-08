import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ComparisonService } from '@/comparison/comparison.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { User } from '@/common/decorators/user.decorator';
import { CompareDto } from '@/comparison/dto/compare.dto';

@Controller('comparison')
export class ComparisonController {
  constructor(private readonly ComparisonService: ComparisonService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('USER', 'ADMIN')
  @Post('compare')
  compare(
    @User() user: { userId: number; email: string; role: 'USER' | 'ADMIN' },
    @Body() body: CompareDto,
  ) {
    return this.ComparisonService.compare(
      user.userId,
      body.cryptoId,
      body.fiatSymbol,
      body.startDate,
      body.endDate,
    );
  }



  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete('all')
  deleteAllComparisons() {
    return this.ComparisonService.deleteAllComparisons();
  }

  @Get('user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('USER', 'ADMIN')
  getUserComparisons(
    @User() user: { userId: number; email: string; role: 'USER' | 'ADMIN' },
  ) {
    return this.ComparisonService.getUserComparisons(user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('USER', 'ADMIN')
  @Get(':id')
  getById(@Param('id') id: string) {
    const numId: number = parseInt(id, 10);
    return this.ComparisonService.getById(numId);
  }
}
