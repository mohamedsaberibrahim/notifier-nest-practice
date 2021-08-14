import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { UsersService } from '../users/users.service';
import { Notification, NotificationDocument } from '../schemas/notification.schema';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

describe('NotificationsController', () => {
  let controller: NotificationsController;
  let mockUserModel: Model<UserDocument>;
  let mockNotificationModel: Model<NotificationDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationsService,
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
      controllers: [NotificationsController],
    }).compile();

    mockUserModel = module.get<Model<UserDocument>>(getModelToken(User.name));
    mockNotificationModel = module.get<Model<NotificationDocument>>(getModelToken(Notification.name));
    controller = module.get<NotificationsController>(NotificationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
