import { ApiHideProperty } from '@nestjs/swagger';
import { NotificationType } from 'src/schemas/notification.schema';

export class CreateNotificationDto {
    type: NotificationType;
    body: object;

    @ApiHideProperty()
    isGroupNotification: boolean;

    @ApiHideProperty()
    isPersonalizedNotification: boolean;
}
