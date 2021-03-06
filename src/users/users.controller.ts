import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../schemas/user.schema';


@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('/register')
    async register(@Body() newUser: CreateUserDto): Promise<User> {
        newUser.password = await this.getHashedPassword(newUser.password);
        return this.usersService.create(newUser);
    }

    @Get('/')
    async getAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Patch(':id')
    async addToGroup(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<User> {
        return await this.usersService.updateById(id, updateUserDto);
    }

    private async getHashedPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
}
