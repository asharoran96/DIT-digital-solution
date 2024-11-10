import { forwardRef, Module } from "@nestjs/common";
import { CredentialsService } from "./service/credentail.service";
import { CredentialsRepository } from "./repository/credentail.repository";
import { IssuerModule } from "../issuer/issuer.module";
import { CredentialController } from "./controller/credential.controller";
import { HodlerModule } from "../holder/holder.module";
import { VerifierModule } from "../verifier/verifier.module";
import { NotificationModule } from "../notification/notification.module";

@Module({
    imports: [IssuerModule,
        VerifierModule, 
        forwardRef(() => HodlerModule),
        forwardRef(() => NotificationModule)],
    controllers: [CredentialController],
    providers: [CredentialsService,
        CredentialsRepository
    ],
    exports: [CredentialsService]
})
export class CredentialModule { }