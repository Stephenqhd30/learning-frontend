export enum UserGenderEnum {
  MALE = 0,
  FEMALE = 1,
  SECURITY = 2,
}

export const userGender = {
  [UserGenderEnum.MALE]: {
    text: '男',
    value: UserGenderEnum.MALE,
  },

  [UserGenderEnum.FEMALE]: {
    text: '女',
    value: UserGenderEnum.FEMALE,
  },
  [UserGenderEnum.SECURITY]: {
    text: '保密',
    value: UserGenderEnum.SECURITY,
  },
};
