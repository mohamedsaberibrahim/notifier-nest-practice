import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGroupDto } from '../dto/create-group.dto';
import { Group, GroupDocument } from '../schemas/group.schema';

@Injectable()
export class GroupsService {
    constructor(@InjectModel(Group.name) private groupModel: Model<GroupDocument>) { }

    async create(groupName: CreateGroupDto): Promise<Group> {
        const createdGroup = new this.groupModel(groupName);
        return createdGroup.save();
    }

    async findAll(): Promise<Group[]> {
        return this.groupModel.find().exec();
    }
}
