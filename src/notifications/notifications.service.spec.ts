import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { Notification, NotificationDocument } from '../schemas/notification.schema';
import { NotificationsService } from './notifications.service';
import { User, UserDocument } from '../schemas/user.schema';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let mockUserModel: Model<UserDocument>;
  let mockNotificationModel: Model<NotificationDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        UsersService,
        {
          provide: getModelToken(Notification.name),
          useValue: Model
        },
        {
          provide: getModelToken(User.name),
          useValue: Model
        },
      ],
    }).compile();

    mockUserModel = module.get<Model<UserDocument>>(getModelToken(User.name));
    mockNotificationModel = module.get<Model<NotificationDocument>>(getModelToken(Notification.name));
    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
