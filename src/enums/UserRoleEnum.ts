export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  BAN = 'ban',
}

export const UserRoleEnum = {
  admin: {
    text: '管理员',
    value: UserRole.ADMIN,
    color: 'processing',
  },
  user: {
    text: '普通用户',
    value: UserRole.USER,
    color: 'success',
  },
  ban: {
    text: '封禁',
    value: UserRole.BAN,
    color: 'error',
  },
};
