export enum CourseStatus {
  WAIT = 'wait',
  RUNNING = 'running',
  SUCCEED = 'succeed',
  FAILED = 'failed',
}

/**
 * 证书状态(0-待审核,1-通过,2-拒绝)
 */
export const certificateStatusEnum = {
  [CourseStatus.WAIT]: {
    text: '等待中',
    value: CourseStatus.WAIT,
    color: 'yellow',
  },
  [CourseStatus.RUNNING]: {
    text: '执行中',
    value: CourseStatus.RUNNING,
    color: 'default',
  },
  [CourseStatus.SUCCEED]: {
    text: '执行成功',
    value: CourseStatus.SUCCEED,
    color: 'green',
  },
  [CourseStatus.FAILED]: {
    text: '执行失败',
    value: CourseStatus.FAILED,
    color: 'red',
  },
};
