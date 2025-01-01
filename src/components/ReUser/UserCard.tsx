import '@umijs/max';
import { Avatar, Button, Space, Tag, Typography } from 'antd';
import React from 'react';
import { ProCard, StatisticCard } from '@ant-design/pro-components';
import { EditOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';

interface Props {
  title?: string;
  user: API.LoginUserVO;
}

/**
 * 用户卡片
 * @param props
 * @constructor
 */
const UserCard: React.FC<Props> = (props) => {
  const { title = '个人信息', user } = props;
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  return (
    <ProCard
      title={title}
      extra={
        currentUser?.id === user?.id && (
          <Button
            type={'text'}
            onClick={() => {
              history.push('/account/settings');
            }}
            icon={<EditOutlined />}
          />
        )
      }
      headerBordered
    >
      <StatisticCard.Group direction={'column'} bodyStyle={{ padding: 0 }}>
        <StatisticCard
          layout={'center'}
          chart={<Avatar size={100} src={user?.userAvatar} />}
          chartPlacement={'left'}
        />
        <StatisticCard
          bodyStyle={{ padding: 0 }}
          headStyle={{ padding: 0 }}
          title={
            <Typography.Text
              style={{
                fontSize: 20,
                fontWeight: 700,
              }}
              ellipsis={{
                tooltip: user?.userName,
                symbol: '...',
              }}
           >
              {user?.userName}
            </Typography.Text>
          }
          statistic={{
            valueRender: () => {
              return (
                <Space wrap>
                  <Tag
                    style={{
                      fontSize: 14,
                    }}
                    color={'blue-inverse'}
                    bordered={false}
                  >
                    {user?.userDepartment}
                  </Tag>
                  <Tag
                   style={{
                      fontSize: 14,
                    }}
                    color={'cyan-inverse'}
                    bordered={false}
                  >
                    {user?.userGrade}
                  </Tag>
                  <Tag
                    style={{
                      fontSize: 14,
                   }}
                    color={'gold-inverse'}
                    bordered={false}
                  >
                    {user?.userMajor}
                  </Tag>
                </Space>
              );
            },
          }}
        />
      </StatisticCard.Group>
    </ProCard>
  );
};
export default UserCard;
