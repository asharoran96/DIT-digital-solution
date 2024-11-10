import { Body, Controller, Param, Post, ValidationPipe } from "@nestjs/common";
import { HolderService } from "../service/holder.service";
import { InvitationResponseDto } from "../dto/invitation-response.dto";
import { CreateHolderReqDto } from "../dto/create-request.dto";
import { InviteReqDto } from "../dto/invite-req.dto";

@Controller('holders')
export class HolderController {
    constructor(private readonly holderService: HolderService) { }
    @Post()
    create(@Body(ValidationPipe) createHolderDto: CreateHolderReqDto) {
        return this.holderService.create(createHolderDto);
    };

    @Post('invite')
    receiveInvitation(@Body(ValidationPipe) inviteReqDto:InviteReqDto) {
        return this.holderService.receiveInvitation(inviteReqDto.verifierId, inviteReqDto.holderId, inviteReqDto.credentialId)
    }
    @Post(':holderId/invitation-respond')
    responseOnInvitation(@Param() reqParam: {holderId:string}, @Body(ValidationPipe) InvitationResponseDto: InvitationResponseDto) {
        return this.holderService.responseOnInvitation(reqParam.holderId, InvitationResponseDto);
    }
}