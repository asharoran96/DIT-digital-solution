import { Test, TestingModule } from '@nestjs/testing';
import { IssuerService } from './issuer.service';
import { IssuerRepository } from '../repository/issuer.repository';
import { CreateIssuerDTO } from '../dto/create-issuer-request.dto';

const mockIssuerRepository = {
  createIssuer: jest.fn(),
};

describe('IssuerService', () => {
  let service: IssuerService;
  let repository: IssuerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IssuerService,
        { provide: IssuerRepository, useValue: mockIssuerRepository },
      ],
    }).compile();

    service = module.get<IssuerService>(IssuerService);
    repository = module.get<IssuerRepository>(IssuerRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an issuer', async () => {
    const createIssuerData: CreateIssuerDTO = { companyName: 'Test Company' };
    const mockResult = { id: '1', companyName: 'Test Company', issuedCredentials: [] };

    repository.createIssuer = jest.fn().mockReturnValue(mockResult);
    expect(await service.create(createIssuerData)).toEqual(mockResult);
    expect(repository.createIssuer).toHaveBeenCalledWith(createIssuerData);
  });
});
