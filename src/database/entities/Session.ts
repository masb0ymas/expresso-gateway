import { BaseEntity } from './Base'

export interface SessionEntity extends BaseEntity {
  deletedAt?: Date | string | null
  UserId: string
  token: string
  ipAddress?: string | null
  device?: string | null
  platform?: string | null
  latitude?: string | null
  longitude?: string | null
}
