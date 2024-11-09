import { Module } from "@nestjs/common";
import { CredentialsService } from "./service/credentail.service";
import { CredentialsRepository } from "./repository/credentail.repository";
import { IssuerModule } from "../issuer/issuer.module";
import { CredentialController } from "./controller/credential.controller";
import { HodlerModule } from "../holder/holder.module";
import { VerifierModule } from "../verifier/verifier.module";

@Module({
    imports: [IssuerModule, HodlerModule, VerifierModule],
    controllers: [CredentialController],
    providers: [CredentialsService,
        CredentialsRepository
    ]
})
export class CredentialModule{}