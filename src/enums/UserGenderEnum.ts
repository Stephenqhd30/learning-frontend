export enum UserGender {
  MALE = 0,
  FEMALE = 1,
  SECURITY = 2,
}

export const userGenderEnum = {
  [UserGender.MALE]: {
    text: '男',
    value: UserGender.MALE,
  },

  [UserGender.FEMALE]: {
    text: '女',
    value: UserGender.FEMALE,
  },
  [UserGender.SECURITY]: {
    text: '保密',
    value: UserGender.SECURITY,
  },
};
