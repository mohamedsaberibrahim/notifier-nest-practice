import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateGroupDto } from '../dto/create-group.dto';
import { Group } from '../schemas/group.schema';
import { GroupsService } from './groups.service';

@ApiTags('groups')
@Controller('groups')
export class GroupsController {
    constructor(private readonly groupsService: GroupsService) { }

    @Post('/')
    async register(@Body() newGroup: CreateGroupDto): Promise<Group> {
        return this.groupsService.create(newGroup);
    }

    @Get('/')
    async getAll(): Promise<Group[]> {
        return this.groupsService.findAll();
    }
}
