import { BaseEntity } from './Base'

export interface RoleEntity extends BaseEntity {
  deletedAt?: Date | string | null
  name: string
}

export type RoleAttributes = Omit<
  RoleEntity,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>
