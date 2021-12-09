export interface SessionEntity {
  id?: string
  UserId: string
  token: string
  ipAddress?: string | null
  device?: string | null
  platform?: string | null
  latitude?: string | null
  longitude?: string | null
  createdAt?: Date
  updatedAt?: Date
}
