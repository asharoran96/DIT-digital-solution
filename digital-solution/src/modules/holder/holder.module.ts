import { forwardRef, Module } from '@nestjs/common';
import { VerifierModule } from '../verifier/verifier.module';
import { CredentialModule } from '../credential/credential.module';
import { NotificationModule } from '../notification/notification.module';
import { HolderController } from './controller/holder.controller';
import { HolderRepository } from './repository/holder.repository';
import { HolderService } from './service/holder.service';

@Module({
  imports: [
    forwardRef(() => CredentialModule),
    VerifierModule,
    NotificationModule,
  ],
  controllers: [HolderController],
  providers: [HolderRepository, HolderService],
  exports: [HolderService],
})
export class HodlerModule {}
