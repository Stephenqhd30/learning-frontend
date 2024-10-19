import React from 'react';
import { Modal } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import UserDetailsCard from '@/components/ReUser/UserDetailsCard';

interface Props {
  onCancel: () => void;
  onSubmit: () => Promise<void>;
  visible: boolean;
  userInfo: API.UserVO;
}

/**
 * 用户详细信息 Modal 框
 * @param props
 * @constructor
 */
const UserDetailsModal: React.FC<Props> = (props) => {
  const { onCancel, onSubmit, visible, userInfo } = props;

  return (
    <Modal
      destroyOnClose
      title={'用户信息'}
      open={visible}
      onCancel={() => {
        onCancel?.();
      }}
      footer
    >
      <ProCard onSubmit={() => onSubmit?.()}>
        <UserDetailsCard user={userInfo} />
      </ProCard>
    </Modal>
  );
};

export default UserDetailsModal;
