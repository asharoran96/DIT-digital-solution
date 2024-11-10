import { Body, Controller, Injectable, Param, Post, ValidationPipe } from "@nestjs/common";
import { VerifierService } from "../service/verifier.service";
import { CreateVerifierReqDto } from "../dto/create-request.dto";
import { InvitationResponseDto } from "../../holder/dto/invitation-response.dto";

@Controller('verifiers')
export class VerifierController{
    constructor(private readonly verifierService: VerifierService){}
    @Post()
    create(@Body(ValidationPipe) createVerifierReqDto: CreateVerifierReqDto){
        return this.verifierService.create(createVerifierReqDto);
    }

}