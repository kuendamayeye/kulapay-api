import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { AgentModule } from './agent/agent.module';
import { UserModule } from './user/user.module';
import { CreditModule } from './credit/credit.module';
import { CreditPaymentModule } from './credit-payment/credit-payment.module';
import { WalletModule } from './wallet/wallet.module';
import { NotificationModule } from './notification/notification.module';
import { AuditLogModule } from './audit-log/audit-log.module';
import { DocumentKycModule } from './document-kyc/document-kyc.module';
import { MerchantModule } from './merchant/merchant.module';
import { SavingsAccountModule } from './savings-account/savings-account.module';
import { SessionDeviceModule } from './session-device/session-device.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserAddressModule } from './user-address/user-address.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    AuditLogModule,
    DocumentKycModule,
    MerchantModule,
    NotificationModule,
    SavingsAccountModule,
    SessionDeviceModule,
    TransactionModule,
    UserAddressModule,
    PrismaModule,
    AgentModule,
    CreditModule,
    CreditPaymentModule,
    WalletModule,
    NotificationModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
