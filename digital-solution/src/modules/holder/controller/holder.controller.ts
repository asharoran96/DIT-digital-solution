import { Body, Controller, Param, Post, ValidationPipe } from "@nestjs/common";
import { HolderService } from "../service/holder.service";
import { InvitationResponseDto } from "../dto/invitation-response.dto";
import { CreateHolderReqDto } from "../dto/create-request.dto";
import { InviteReqDto } from "../dto/invite-req.dto";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
@ApiTags('holders')
@Controller('holders')
export class HolderController {
    constructor(private readonly holderService: HolderService) { }
    @ApiOperation({ summary: 'Create a new Holder' })
    @ApiResponse({ status: 201, description: 'The Holder has been successfully created.' })
    @ApiResponse({ status: 409, description: 'Holder already exist with this name' })
    @Post()
    create(@Body(ValidationPipe) createHolderDto: CreateHolderReqDto) {
        return this.holderService.create(createHolderDto);
    };

    @ApiOperation({ summary: 'Send invitation to the holder to accept or reject the credential' })
    @ApiResponse({ status: 200, description: 'Holder with {id} received the invitation successfully' })
    @ApiResponse({ status: 408, description: 'this credential is expired ' })
    @Post('invite')
    receiveInvitation(@Body(ValidationPipe) inviteReqDto:InviteReqDto) {
        return this.holderService.receiveInvitation(inviteReqDto.verifierId, inviteReqDto.holderId, inviteReqDto.credentialId)
    }

    @ApiOperation({ summary: 'Holder will respond on the invitation (accept/reject)' })
    @ApiResponse({ status: 201, description: 'This crd status updated to Accepted/Reject successfully' })
    @ApiResponse({ status: 408, description: 'this credential is expired' })
    @ApiParam({ name: 'holderId', type: String, description: 'ID of the holder who will respond on invitation' })
    @Post(':holderId/invitation-respond')
    responseOnInvitation(@Param() reqParam: {holderId:string}, @Body(ValidationPipe) InvitationResponseDto: InvitationResponseDto) {
        return this.holderService.responseOnInvitation(reqParam.holderId, InvitationResponseDto);
    }
}