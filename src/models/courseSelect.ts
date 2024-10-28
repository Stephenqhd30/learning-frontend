import { useState } from 'react';
import { listCourseByPageUsingPost } from '@/services/learning-backend/courseController';
import { message } from 'antd';

/**
 * 课程
 */
export default () => {
  const [courseList, setCourseList] = useState<API.CourseVO[]>([]);

  const loadData = async () => {
    try {
      const res = await listCourseByPageUsingPost({
        pageSize: 50,
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
