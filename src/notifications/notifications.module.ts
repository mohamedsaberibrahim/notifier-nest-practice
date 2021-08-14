import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from 'src/schemas/notification.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        UsersModule,
        MongooseModule.forFeature(
            [
                { name: Notification.name, schema: NotificationSchema }
            ]
        )],
    providers: [NotificationsService],
    controllers: [NotificationsController]
})
export class NotificationsModule { }
