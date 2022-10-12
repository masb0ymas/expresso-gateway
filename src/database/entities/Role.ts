import { BaseEntity } from './Base'

export interface RoleEntity extends BaseEntity {
  name: string
}

export type RoleAttributes = Omit<
  RoleEntity,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>
