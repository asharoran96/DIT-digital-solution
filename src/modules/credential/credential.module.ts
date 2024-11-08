import { Module } from "@nestjs/common";
import { CredentialsService } from "./service/credentail.service";
import { CredentialsRepository } from "./repository/credentail.repository";
import { IssuerModule } from "../issuer/issuer.module";
import { CredentialController } from "./controller/credential.controller";

@Module({
    imports: [IssuerModule],
    controllers: [CredentialController],
    providers: [CredentialsService,
        CredentialsRepository
    ]
})
export class CredentialModule{}