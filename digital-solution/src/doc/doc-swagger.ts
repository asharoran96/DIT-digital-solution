import { DocumentBuilder} from "@nestjs/swagger";

export const docConfig = new DocumentBuilder()
.setTitle('DIT Digital Solution')
.setDescription('DIT Digital Solutin APIs')
.addTag('default')
.build()