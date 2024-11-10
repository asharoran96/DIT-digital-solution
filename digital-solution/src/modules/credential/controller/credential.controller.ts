import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { CreateCredentialsDto } from "../dto/credential.dto";
import { CredentialsService } from "../service/credentail.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('credentials')
@Controller('credentials')
export class CredentialController{
    constructor(private readonly crdService: CredentialsService){}
    @ApiOperation({ summary: 'Create a new credential' })
    @ApiResponse({ status: 201, description: 'The credentail has been successfully created.' })
    @ApiResponse({ status: 409, description: 'Credential already exist with this id' })
    @Post()
    create(@Body(ValidationPipe) createCrdDto: CreateCredentialsDto){
        return this.crdService.create(createCrdDto);
    }
}