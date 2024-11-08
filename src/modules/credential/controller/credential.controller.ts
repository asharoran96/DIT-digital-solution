import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { CreateCredentialsDto } from "../dto/credential.dto";
import { CredentialsService } from "../service/credentail.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('credentials')
@Controller('credentials')
export class CredentialController{
    constructor(private readonly crdService: CredentialsService){}
    @ApiOperation({ summary: 'Create a new credential' })
    @Post()
    create(@Body(ValidationPipe) createCrdDto: CreateCredentialsDto){
        return this.crdService.create(createCrdDto);
    }
}