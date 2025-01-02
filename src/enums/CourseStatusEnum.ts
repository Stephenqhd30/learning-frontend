export enum CourseStatus {
  WAIT = 'wait',
  BEGIN = 'begin',
  END = 'end',
}

/**
 * 课程状态(0-待审核,1-通过,2-拒绝)
 */
export const courseStatusEnum = {
  [CourseStatus.WAIT]: {
    text: '未开始',
    value: CourseStatus.WAIT,
    color: 'yellow',
  },
  [CourseStatus.BEGIN]: {
    text: '进行中',
    value: CourseStatus.BEGIN,
    color: 'green',
  },
  [CourseStatus.END]: {
    text: '已结束',
    value: CourseStatus.END,
    color: 'red',
  },
};
