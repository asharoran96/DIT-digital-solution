import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { InvitationStatus } from '../verifier/enum/iveitation-status.enum';
import { VerifierService } from '../verifier/service/verifier.service';
import { forwardRef, Inject } from '@nestjs/common';
import { CredentialsService } from '../credential/service/credentail.service';

@WebSocketGateway()
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly verifierService: VerifierService,
        @Inject(forwardRef(()=> CredentialsService)) private readonly credService : CredentialsService 
    ){}
  @WebSocketServer() server: Server;
  private clients: Map<string, any> = new Map(); // Store holderId with their socket ID

  handleConnection(client: any) {
    console.log('Client connected: ', client.id);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected: ', client.id);
    // Remove the client from the clients map
    this.clients.forEach((value, key) => {
      if (value === client.id) {
        this.clients.delete(key);
      }
    });
  }

  sendVerificationEvent(holderId: string, credentialData: any) {
    this.server.to(holderId).emit('credentialVerified', {
      event: 'credentialVerified',
      data: credentialData,
    });
  }
  notifyHolder(holderId: string, data: any, event:string) {
    this.server.to(`holder-${holderId}`).emit('credentialVerified', {event, data});
  }

  notifyVerifier(verifierId: string, data: any , event: string) {
    this.server.to(`verifier-${verifierId}`).emit('credentialVerified', {
        event,
        message: 'the credential is verified',
        data,
      });
  }
  sendCredentialVerified(holderId: string, verifierId: string, credentialId: string) {
    console.log('Receive Socket verified invit ')
    const message = { credentialId, status: InvitationStatus.Verified};
    this.credService.changeCrdStatus(credentialId, InvitationStatus.Verified)
    this.verifierService.changeCrdStatus(verifierId, holderId,credentialId, InvitationStatus.Verified)
    this.notifyHolder(holderId, message, 'credentialVerified');
    this.notifyVerifier(verifierId, message, 'credentialVerified');
  }
  sendRevocationEvent(holderId: string) {
    console.log('Receive Socket Revocked invit ')
    this.server.to(holderId).emit('credentialRevoked', {
      event: 'credentialRevoked',
      message: 'Your credential has expired.',
    });
  }

  // Subscribe client with their holderId
  subscribe(holderId: string, clientId: string) {
    this.clients.set(holderId, clientId);
  }
}
