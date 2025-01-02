import {useState} from 'react';
import {listCourseByPageUsingPost} from '@/services/learning-backend/courseController';
import {message} from 'antd';
import {CourseStatus} from '@/enums/CourseStatusEnum';

/**
 * 课程
 */
export default () => {
  const [courseList, setCourseList] = useState<API.CourseVO[]>([]);

  const loadData = async () => {
    try {
      const res = await listCourseByPageUsingPost({
        pageSize: 500,
        status: CourseStatus.BEGIN,
      });
      if (res.code === 0 && res?.data?.records) {
        setCourseList(res?.data?.records);
      } else {
        setCourseList([]);
      }
    } catch (error: any) {
      message.error(`获取课程列表失败${error.message}`);
    }
  };

  return { courseList, loadData };
};
