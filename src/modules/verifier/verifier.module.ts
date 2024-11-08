import { Module } from "@nestjs/common";
import { VerifierController } from "./controller/verifier.module";
import { VerifierRepository } from "./repository/verifier.repository";
import { VerifierService } from "./service/verifier.service";

@Module({
    imports: [],
    controllers: [VerifierController],
    providers: [VerifierRepository, VerifierService]
})
export class VerifierModule { }