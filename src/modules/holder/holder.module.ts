import { Module } from "@nestjs/common";
import { HolderRepository } from "./repository/holder.repository";
import { HolderService } from "./service/holder.service";
import { HolderController } from "./controller/holder.controller";

@Module({
    imports: [],
    controllers: [HolderController],
    providers: [HolderRepository, HolderService]
})
export class HodlerModule { }