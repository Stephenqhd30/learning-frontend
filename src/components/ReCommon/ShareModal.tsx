import { Modal, QRCode } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import React from 'react';

interface Props {
  visible: boolean;
  link: string;
  title: string;
  onCancel: () => void;
}

const ShareModal: React.FC<Props> = (props) => {
  const { visible, link, title, onCancel } = props;
  return (
    <Modal footer={false} open={visible} title={'分享'} onCancel={() => onCancel?.()}>
      <ProCard title={title}>
        <QRCode
          errorLevel="H"
          value={link}
          icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        />
      </ProCard>
    </Modal>
  );
};

export default ShareModal;
