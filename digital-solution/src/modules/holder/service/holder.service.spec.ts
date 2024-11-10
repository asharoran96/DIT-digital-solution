import { Test, TestingModule } from '@nestjs/testing';
import { HolderService } from './holder.service';
import { NotificationGateway } from '../../../modules/notification/notification.gateway';
import { HolderRepository } from '../repository/holder.repository';
import { VerifierService } from '../../../modules/verifier/service/verifier.service';
import { CredentialsService } from '../../../modules/credential/service/credentail.service';
import { CreateHolderReqDto } from '../dto/create-request.dto';
import { ICreateHolder } from '../interface/create-holder.interface';
import { InvitationStatus } from '../../../modules/verifier/enum/iveitation-status.enum';

const mockHolderRepository = {
    createHolder: jest.fn(),
    responseOnInvitation: jest.fn()
};

const mockCredentialsService = {
    changeCrdStatus: jest.fn()
};

describe('HolderService', () => {
    let service: HolderService;
    let repository: HolderRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                HolderService,
                { provide: NotificationGateway, useValue: { sendVerificationEvent: jest.fn() } },
                { provide: HolderRepository, useValue: mockHolderRepository },
                { provide: VerifierService, useValue: { isExpired: jest.fn(), changeCrdStatus: jest.fn() } },
                { provide: CredentialsService, useValue: mockCredentialsService }
            ],
        }).compile();

        service = module.get<HolderService>(HolderService);
        repository = module.get<HolderRepository>(HolderRepository);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
      });
    it('should create a Holder', async () => {
        const createHolderData: CreateHolderReqDto = { name: 'Holder test' };
        const mockResult: ICreateHolder = { id: "aodojojaoaj", name: 'Holder test', walletKey: "soddfofjiofjo", credentials: [] };
        repository.create = jest.fn().mockReturnValue(mockResult);

        expect(await service.create(createHolderData)).toEqual(mockResult);
        expect(repository.create).toHaveBeenCalledWith(createHolderData.name);
    });
    
});
