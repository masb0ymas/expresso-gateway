export interface BaseEntity {
  id: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}
