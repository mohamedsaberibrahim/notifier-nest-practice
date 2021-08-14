import { ApiHideProperty } from '@nestjs/swagger';
import { NotificationType } from '../schemas/notification.schema';

export class CreateNotificationDto {
    type: NotificationType;
    body: object;

    @ApiHideProperty()
    isGroupNotification: boolean;

    @ApiHideProperty()
    isPersonalizedNotification: boolean;
}
