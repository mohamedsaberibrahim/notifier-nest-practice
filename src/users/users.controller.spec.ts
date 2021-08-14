import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;
  let mockUserModel: Model<UserDocument>;
  const newUser: CreateUserDto = {
    username: "test",
    password: "12345",
    phoneNumber: "01000000000",
    email: "test@gmail.com"
  };
  const updateUser: UpdateUserDto = {
    groupId: "mckmnkfjmdcpad",
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService,
        {
          provide: getModelToken(User.name),
          useValue: Model
        },
      ],
    }).compile();

    mockUserModel = module.get<Model<UserDocument>>(getModelToken(User.name));
    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call usersService.create when calling register', async () => {
    const result: User = {
      username: "test",
      password: "12345",
      phoneNumber: "01000000000",
      email: "test@gmail.com",
      groupId: ""
    };
    jest.spyOn(usersService, 'create').mockImplementation(async () => result);

    expect(await controller.register(newUser)).toBe(result);
  });

  it('should call usersService.updateById when calling addToGroup', async () => {
    const result: User = {
      username: "test",
      password: "12345",
      phoneNumber: "01000000000",
      email: "test@gmail.com",
      groupId: "mckmnkfjmdcpad"
    };
    jest.spyOn(usersService, 'updateById').mockImplementation(async () => result);

    expect(await controller.addToGroup("kldmckjndckd", updateUser)).toBe(result);
  });

  it('should call usersService.updateById when calling addToGroup', async () => {
    const result: User[] = [{
      username: "test",
      password: "12345",
      phoneNumber: "01000000000",
      email: "test@gmail.com",
      groupId: "mckmnkfjmdcpad"
    }];
    jest.spyOn(usersService, 'findAll').mockImplementation(async () => result);

    expect(await controller.getAll()).toBe(result);
  });
});
