import { Body, Controller, Get, Param, Post, ValidationPipe } from "@nestjs/common";
import { CreateIssuerDTO } from "../dto/create-issuer-request.dto";
import { IssuerService } from "../service/issuer.service";

@Controller('issuer')
export class IssuerController{
  constructor(private readonly issuerService: IssuerService){}
  @Get(':id')
  getIssuerById(@Param('id') id: string){
    return this.issuerService.getById(id)
  }
  @Post()
  createIssuer(@Body(ValidationPipe)createIssuerDto: CreateIssuerDTO) {
    return this.issuerService.create(createIssuerDto);
  }


}