import { Module } from "@nestjs/common";
import { IssuerController } from "./controller/issuer.controller";
import { IssuerService } from "./service/issuer.service";
import { IssuerRepository } from "./repository/issuer.repository";

@Module({
  imports: [],
  controllers: [IssuerController],
  providers: [IssuerService,IssuerRepository]
})
export class IssuerModule{}