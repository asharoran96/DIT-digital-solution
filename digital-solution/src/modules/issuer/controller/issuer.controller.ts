import { Body, Controller, Get, Param, Post, ValidationPipe } from "@nestjs/common";
import { CreateIssuerDTO } from "../dto/create-issuer-request.dto";
import { IssuerService } from "../service/issuer.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('issuers')
@Controller('issuers')
export class IssuerController{
  constructor(private readonly issuerService: IssuerService){}
  @ApiOperation({ summary: 'Create a new Issuer' })
  @Post()
  createIssuer(@Body(ValidationPipe)createIssuerDto: CreateIssuerDTO) {
    return this.issuerService.create(createIssuerDto);
  }
  @Get(':id')
  getIssuerById(@Param('id') id: string){
    return this.issuerService.getById(id)
  }

}