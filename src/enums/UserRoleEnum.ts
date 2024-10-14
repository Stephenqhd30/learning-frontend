export enum UserRoleEnum {
  ADMIN = 'admin',
  USER = 'user',
  BAN = 'ban',
}

export const userRole = {
  [UserRoleEnum.ADMIN]: {
    text: '管理员',
    value: UserRoleEnum.ADMIN,
    color: 'processing',
  },
  [UserRoleEnum.USER]: {
    text: '普通用户',
    value: UserRoleEnum.USER,
    color: 'success',
  },
  [UserRoleEnum.BAN]: {
    text: '封禁',
    value: UserRoleEnum.BAN,
    color: 'error',
  },
};
