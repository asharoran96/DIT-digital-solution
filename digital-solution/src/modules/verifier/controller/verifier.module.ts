import { Body, Controller, Injectable, Param, Post, ValidationPipe } from "@nestjs/common";
import { VerifierService } from "../service/verifier.service";
import { CreateVerifierReqDto } from "../dto/create-request.dto";
import { InvitationResponseDto } from "../../holder/dto/invitation-response.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller('verifiers')
export class VerifierController{
    constructor(private readonly verifierService: VerifierService){}
    @ApiOperation({ summary: 'Create a new Verifier' })
    @ApiResponse({ status: 201, description: 'The verifier has been successfully created.' })
    @ApiResponse({ status: 409, description: 'Verifier already exist with this test2Tshjaaree company name' })
    @Post()
    create(@Body(ValidationPipe) createVerifierReqDto: CreateVerifierReqDto){
        return this.verifierService.create(createVerifierReqDto);
    }

}