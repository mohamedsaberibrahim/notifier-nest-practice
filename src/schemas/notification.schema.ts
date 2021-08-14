import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

export enum NotificationType {
    SMS = 'SMS',
    PUSH_NOTIFICATION = 'PUSH_NOTIFICATION'
};


@Schema({ timestamps: true })
export class Notification {
    @Prop({ type: Object })
    body: object;

    @Prop()
    isGroupNotification: boolean;

    @Prop()
    isPersonalizedNotification: boolean;

    @Prop()
    type: NotificationType;

    @Prop()
    userId: string;

    @Prop()
    groupId: string;
};

export const NotificationSchema = SchemaFactory.createForClass(Notification);
