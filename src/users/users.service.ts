import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findByUserId(userId: string): Promise<User> {
        return this.userModel.findById(userId).exec();
    }

    async findByGroupId(groupId: string): Promise<User[]> {
        return this.userModel.find({ groupId: groupId }).exec();
    }

    async updateById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return await this.userModel.findByIdAndUpdate({ _id: id }, updateUserDto, { new: true });
    }
}
