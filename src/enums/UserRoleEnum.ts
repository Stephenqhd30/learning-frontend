export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  BAN = 'ban',
}

export const userRoleEnum = {
  [UserRole.ADMIN]: {
    text: '管理员',
    value: UserRole.ADMIN,
    color: 'processing',
  },
  [UserRole.USER]: {
    text: '普通用户',
    value: UserRole.USER,
    color: 'success',
  },
  [UserRole.BAN]: {
    text: '封禁',
    value: UserRole.BAN,
    color: 'error',
  },
};
