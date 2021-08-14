import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Group, GroupDocument } from '../schemas/group.schema';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';

describe('GroupsController', () => {
  let controller: GroupsController;
  let mockGroupModel: Model<GroupDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupsController],
      providers: [
        GroupsService,
        {
          provide: getModelToken(Group.name),
          useValue: Model
        },
      ]
    }).compile();

    mockGroupModel = module.get<Model<GroupDocument>>(getModelToken(Group.name));
    controller = module.get<GroupsController>(GroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
