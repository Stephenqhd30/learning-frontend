import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { ACCOUNT_TITLE } from '@/constants';
import { Col, Grid, Row } from 'antd';
import { useModel } from '@@/exports';
import UserCard from '@/components/ReUser/UserCard';
import UserDetailsCard from '@/components/ReUser/UserDetailsCard';

const {useBreakpoint} = Grid;
/**
 * 用户中心
 * @constructor
 */
const UserCenter: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const scene = useBreakpoint();
  const isMobile = !scene.md;
  return (
    <PageContainer breadcrumb={undefined} title={ACCOUNT_TITLE}>
      <Row align={'top'} gutter={[16, 16]}>
        <Col span={ isMobile ? 24 : 7 }>
          <UserCard user={currentUser || {}} />
        </Col>
        <Col span={ isMobile ? 24 : 17 }>
          <UserDetailsCard user={currentUser || {}} />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default UserCenter;
