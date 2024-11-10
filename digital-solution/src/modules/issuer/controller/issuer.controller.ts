import { Body, Controller, Get, Param, Post, ValidationPipe } from "@nestjs/common";
import { CreateIssuerDTO } from "../dto/create-issuer-request.dto";
import { IssuerService } from "../service/issuer.service";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('issuers')
@Controller('issuers')
export class IssuerController {
  constructor(private readonly issuerService: IssuerService) { }
  @ApiOperation({ summary: 'Create a new Issuer' })
  @ApiResponse({ status: 201, description: 'The issuer has been successfully created.' })
  @ApiResponse({ status: 409, description: 'Issuer already exist with this test2Tshjaaree company name' })
  @Post()
  createIssuer(@Body(ValidationPipe) createIssuerDto: CreateIssuerDTO) {
    return this.issuerService.create(createIssuerDto);
  }

}