import { useState } from 'react';
import { listCourseByPageUsingPost } from '@/services/learning-backend/courseController';
import { message } from 'antd';

/**
 * 课程
 */
export default () => {
  const [courseSelect, setCourseSelect] = useState<API.CourseVO[]>([]);

  const loadData = async () => {
    try {
      const res = await listCourseByPageUsingPost({
        pageSize: 20,
        sortField: 'createTime',
        sortOrder: 'desc',
      });
      if (res.code === 0 && res?.data?.records) {
        setCourseSelect(res?.data?.records);
      } else {
        setCourseSelect([]);
      }
    } catch (error: any) {
      message.error(`获取课程列表失败${error.message}`);
    }
  };

  return { courseSelect, loadData };
};
