import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNotificationDto } from 'src/dto/create-notification.dto';
import { Notification, NotificationDocument, NotificationType } from 'src/schemas/notification.schema';
import { User } from 'src/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
        private usersService: UsersService
    ) { }

    async sendToUser(userId: string, createNotificationDto: CreateNotificationDto): Promise<void> {
        const user = await this.usersService.findByUserId(userId);
        createNotificationDto.isPersonalizedNotification = true;
        createNotificationDto.isGroupNotification = false;
        this.create(createNotificationDto);

        if (createNotificationDto.type === NotificationType.PUSH_NOTIFICATION) {
            this.sendNotificationForUser(user, createNotificationDto.body);
        }
        else {
            this.sendSMSForUser(user, createNotificationDto.body);
        }
    }

    async sendToGroup(groupId: string, createNotificationDto: CreateNotificationDto): Promise<void> {

        const users = await this.usersService.findByGroupId(groupId);
        createNotificationDto.isPersonalizedNotification = false;
        createNotificationDto.isGroupNotification = true;
        this.create(createNotificationDto);

        if (createNotificationDto.type === NotificationType.PUSH_NOTIFICATION) {
            users.forEach(user => {
                this.sendNotificationForUser(user, createNotificationDto.body);
            });
        }
        else {
            users.forEach(user => {
                this.sendSMSForUser(user, createNotificationDto.body);
            });
        }
    }

    async getNotificationByUser(userId: string): Promise<Notification[]> {
        return this.notificationModel.find({
            isPersonalizedNotification: true,
            userId: userId
        }).exec();
    }

    async getNotificationByGroup(groupId: string): Promise<Notification[]> {
        return this.notificationModel.find({
            isGroupNotification: true,
            groupId: groupId
        }).exec();
    }

    async create(newNotification: CreateNotificationDto): Promise<Notification> {
        const createdNotification = new this.notificationModel(newNotification);
        return createdNotification.save();
    }

    sendSMSForUser(user: User, body: Object): void {
        /** Should use SMS provider */
        return;
    }

    sendNotificationForUser(user: User, body: Object): void {
        /** Should use firebase for push-notification */
        return;
    }
}
