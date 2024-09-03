export enum ReviewStatus {
  REVIEWING = 0,
  PASS = 1,
  REJECT = 2,
}

/**
 * 证书状态(0-待审核,1-通过,2-拒绝)
 */
export const ReviewStatusEnum = {
  0: {
    text: '待审核',
    value: ReviewStatus.REVIEWING,
  },
  1: {
    text: '通过',
    value: ReviewStatus.PASS,
  },
  2: {
    text: '拒绝',
    value: ReviewStatus.REJECT,
  },
};
