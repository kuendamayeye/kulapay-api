import { Module } from '@nestjs/common';
import { SavingsAccountService } from './savings-account.service';
import { SavingsAccountController } from './savings-account.controller';

@Module({
  controllers: [SavingsAccountController],
  providers: [SavingsAccountService],
})
export class SavingsAccountModule {}
