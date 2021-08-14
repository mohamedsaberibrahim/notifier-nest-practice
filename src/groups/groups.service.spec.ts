import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Group, GroupDocument, GroupSchema } from '../schemas/group.schema';
import { GroupsService } from './groups.service';

describe('GroupsService', () => {
  let service: GroupsService;
  let mockGroupModel: Model<GroupDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupsService,
        {
          provide: getModelToken(Group.name),
          useValue: Model
        },
      ],
    }).compile();

    mockGroupModel = module.get<Model<GroupDocument>>(getModelToken(Group.name));
    service = module.get<GroupsService>(GroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
