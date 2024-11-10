import { forwardRef, Module } from "@nestjs/common";
import { NotificationGateway } from "./notification.gateway";
import { VerifierModule } from "../verifier/verifier.module";
import { CredentialModule } from "../credential/credential.module";

@Module({
    imports: [VerifierModule, forwardRef(()=>CredentialModule) ],
    providers: [NotificationGateway],
    exports: [NotificationGateway]
})
export class NotificationModule{}