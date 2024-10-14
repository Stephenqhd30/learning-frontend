export enum ReviewStatusEnum {
  REVIEWING = 0,
  PASS = 1,
  REJECT = 2,
}

/**
 * 证书状态(0-待审核,1-通过,2-拒绝)
 */
export const reviewStatus = {
  [ReviewStatusEnum.REVIEWING]: {
    text: '待审核',
    value: ReviewStatusEnum.REVIEWING,
    color: 'yellow',
  },
  [ReviewStatusEnum.PASS]: {
    text: '通过',
    value: ReviewStatusEnum.PASS,
    color: 'green',
  },
  [ReviewStatusEnum.REJECT]: {
    text: '拒绝',
    value: ReviewStatusEnum.REJECT,
    color: 'red',
  },
};
