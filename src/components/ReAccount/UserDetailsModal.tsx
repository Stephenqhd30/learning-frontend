import React from 'react';
import { Modal } from 'antd';
import UserDetailsCard from '@/components/ReAccount/UserDetailsCard';

interface CertificateDetailsProps {
  user: API.UserVO;
  visible: boolean;
  onCancel: () => void;
}

const UserDetailsModal: React.FC<CertificateDetailsProps> = (props) => {
  const { user, visible, onCancel } = props;
  return (
    <Modal title={'用户详细'} destroyOnClose onCancel={onCancel} open={visible} width={800} onOk={onCancel}>
      <UserDetailsCard user={user} />
    </Modal>
  );
};

export default UserDetailsModal;
