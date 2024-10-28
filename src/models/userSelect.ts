import { useState } from 'react';
import { message } from 'antd';
import { listUserByPageUsingPost } from '@/services/learning-backend/userController';

/**
 * 课程
 */
export default () => {
  const [userList, setUserList] = useState<API.User[]>([]);

  const loadData = async () => {
    try {
      const res = await listUserByPageUsingPost({
        pageSize: 50,
      });
      if (res.code === 0 && res?.data?.records) {
        setUserList(res?.data?.records);
      } else {
        setUserList([]);
      }
    } catch (error: any) {
      message.error(`获取课程列表失败${error.message}`);
    }
  };

  return { userList, loadData };
};
