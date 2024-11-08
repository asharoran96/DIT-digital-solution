import { Module } from "@nestjs/common";
import { HolderRepository } from "./repository/holder.repository";
import { HolderService } from "./service/holder.service";
import { HolderController } from "./controller/holder.controller";
import { VerifierModule } from "../verifier/verifier.module";

@Module({
    imports: [VerifierModule],
    controllers: [HolderController],
    providers: [HolderRepository, HolderService],
    exports: [HolderService]
})
export class HodlerModule { }