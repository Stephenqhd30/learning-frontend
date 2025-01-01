import React from 'react';
import { Image, Modal } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import { UserDetailsCard } from '@/components';

interface CertificateDetailsProps {
  user: API.UserVO;
  visible: boolean;
  onCancel: () => void;
}

/**
 * 用户信息卡片
 * @param props
 * @constructor
 */
const UserInfoCard: React.FC<CertificateDetailsProps> = (props) => {
  const { user, visible, onCancel } = props;
  return (
    <Modal
      title={'用户详细'}
      destroyOnClose
      onCancel={onCancel}
      open={visible}
      width={800}
      onOk={onCancel}
      footer={null}
    >
      <ProCard bordered={false}>
        <UserDetailsCard user={user} />
      </ProCard>
      <ProCard bordered={false}>
        <Image src={user?.userAvatar} width={296} height={296} />
      </ProCard>
    </Modal>
  );
};

export default UserInfoCard;
