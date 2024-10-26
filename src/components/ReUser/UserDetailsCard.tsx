import '@umijs/max';
import React from 'react';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { userRoleEnum } from '@/enums/UserRoleEnum';
import {UserAvatarCard} from '@/components';

interface Props {
  user: API.User;
}

/**
 * 用户详情卡片
 * @param props
 * @constructor
 */
const UserDetailsCard: React.FC<Props> = (props) => {
  const { user } = props;

  return (
    <>
      <ProCard>
        <ProDescriptions<API.User>
          column={1}
          title={<UserAvatarCard user={user} />}
          dataSource={user}
          emptyText={'该用户比较懒 还没有设置'}
          columns={[
            {
              title: 'id',
              key: 'id',
              dataIndex: 'id',
            },
            {
              title: '角色',
              key: 'userRole',
              dataIndex: 'userRole',
              valueEnum: userRoleEnum,
            },
            {
              title: '用户名',
              key: 'userName',
              dataIndex: 'userName',
              valueType: 'text',
            },
            {
              title: '身份证号',
              key: 'userIdCard',
              dataIndex: 'userIdCard',
              valueType: 'text',
              hideInDescriptions: true,
            },
            {
              title: '简介',
              key: 'userProfile',
              dataIndex: 'userProfile',
              valueType: 'text',
            },
            {
              title: '邮箱',
              key: 'userEmail',
              dataIndex: 'userEmail',
              valueType: 'text',
            },
            {
              title: '电话',
              key: 'userPhone',
              dataIndex: 'userPhone',
              valueType: 'text',
            },
          ]}
        />
      </ProCard>
    </>
  );
};
export default UserDetailsCard;
