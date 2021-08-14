import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { Notification } from '../schemas/notification.schema';
import { NotificationsService } from './notifications.service';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) { }


    @Post('/notify-user/:userId')
    async notifyUser(
        @Param('userId') id: string,
        @Body() createNotificationDto: CreateNotificationDto
    ): Promise<void> {
        return this.notificationsService.sendToUser(id, createNotificationDto);
    }

    @Post('/notify-group/:groupId')
    async notifyGroup(
        @Param('groupId') id: string,
        @Body() createNotificationDto: CreateNotificationDto
    ): Promise<void> {
        return this.notificationsService.sendToGroup(id, createNotificationDto);
    }

    @Get('/users/:userId')
    async getNotificationsByUser(@Param('userId') id: string): Promise<Notification[]> {
        return this.notificationsService.getNotificationByUser(id);
    }

    @Get('/groups/:groupId')
    async getNotificationsByGroup(@Param('groupId') id: string): Promise<Notification[]> {
        return this.notificationsService.getNotificationByGroup(id);
    }
}
