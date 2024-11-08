import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { IssuerModule } from './modules/issuer/issuer.module';
import { CredentialModule } from './modules/credential/credential.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: '.env'
      }
    ),
    IssuerModule,
    CredentialModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
