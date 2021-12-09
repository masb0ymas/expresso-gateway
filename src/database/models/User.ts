export interface UserEntity {
  id: string
  firstName: string
  lastName: string
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
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export interface UserLoginAttributes {
  uid: string
}

export interface TokenAttributes {
  data: UserEntity
  message: string
}

export type LoginAttributes = Pick<UserEntity, 'email' | 'password'>
