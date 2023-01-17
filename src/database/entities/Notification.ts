import { BaseEntity } from './Base'

export interface NotificationEntity extends BaseEntity {
  deletedAt?: Date | string | null
  UserId?: string | null
  title: string
  content: string
  contentHTML: string
  type: string // all, by-user
  isRead?: boolean | null
  isPublishSchedule?: boolean | null
  publishAt?: Date | null
}

export type NotificationAttributes = Omit<
  NotificationEntity,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>
