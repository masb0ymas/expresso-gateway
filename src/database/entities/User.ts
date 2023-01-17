import { BaseEntity } from './Base'

export interface UserEntity extends BaseEntity {
  deletedAt?: Date | string | null
  fullName: string
  phone?: string | null
  email: string
  password?: string | null
  isActive?: boolean | null
  isBlocked?: boolean | null
  tokenVerify?: string | null
  picturePath?: string | null
  RoleId: string
  newPassword?: string
  confirmNewPassword?: string
}

export interface UserLoginAttributes {
  uid: string
}

export interface TokenAttributes {
  data: UserEntity
  message: string
}

export type LoginAttributes = Pick<UserEntity, 'email' | 'password'>

export type UserAttributes = Omit<
  UserEntity,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>
