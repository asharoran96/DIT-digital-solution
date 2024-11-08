import { Body, Controller, Injectable, Post, ValidationPipe } from "@nestjs/common";
import { VerifierService } from "../service/verifier.service";
import { CreateVerifierReqDto } from "../dto/create-request.dto";
import { InvitationResponseDto } from "../dto/invitation-response.dto";

@Controller('verifiers')
export class VerifierController{
    constructor(private readonly verifierService: VerifierService){}
    @Post('')
    create(@Body() createVerifierReqDto: CreateVerifierReqDto){
        return this.verifierService.create(createVerifierReqDto);
    }

    @Post('invitation-respond')
    responseOnInvitation(@Body(ValidationPipe) InvitationResponseDto: InvitationResponseDto) {
        return this.verifierService.responseOnInvitation(InvitationResponseDto);
    }
}