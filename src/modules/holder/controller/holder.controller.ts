import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { HolderService } from "../service/holder.service";
import { InvitationResponseDto } from "../../verifier/dto/invitation-response.dto";
import { CreateHolderReqDto } from "../dto/create-request.dto";

@Controller('holders')
export class HolderController {
    constructor(private readonly holderService: HolderService) { }
    @Post('')
    create(@Body(ValidationPipe) createHolderDto: CreateHolderReqDto) {
        return this.holderService.create(createHolderDto);
    };
    @Post('invite')
    receiveInvitation(@Body()data: any){
        return this.holderService.receiveInvitation(data)
    }

}