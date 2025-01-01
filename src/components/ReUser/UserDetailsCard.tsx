import React from 'react';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';

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
    <ProCard>
      <ProDescriptions<API.User>
        column={1}
        dataSource={user}
        emptyText={'该用户比较懒 还没有设置'}
        columns={[
          {
            title: 'id',
            key: 'id',
            dataIndex: 'id',
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
            title: '电话',
            key: 'userPhone',
            dataIndex: 'userPhone',
            valueType: 'text',
          },
          {
            title: '院系',
            dataIndex: 'userDepartment',
            valueType: 'text',
          },
          {
            title: '年级',
            dataIndex: 'userGrade',
            valueType: 'text',
          },
          {
            title: '专业',
            dataIndex: 'userMajor',
            valueType: 'text',
          },
        ]}
      />
    </ProCard>
  );
};
export default UserDetailsCard;
