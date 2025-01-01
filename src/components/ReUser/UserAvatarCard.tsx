import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import React from 'react';

interface Props {
  user: API.UserVO;
}

/**
 * 用户头像卡片
 * @param props
 * @constructor
 */
const UserAvatarCard: React.FC<Props> = ({ user }) => {
  return (
    <Space>
      {user?.userAvatar ? <Avatar src={user?.userAvatar} /> : <Avatar icon={<UserOutlined />} />}
      <span>{user?.userName}</span>
    </Space>
  );
};

export default UserAvatarCard;
