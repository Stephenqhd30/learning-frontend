import { Modal, QRCode } from 'antd';
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
    <Modal footer={false} open={visible} title={title} onCancel={() => onCancel?.()}>
      <QRCode
        errorLevel="H"
        value={link}
        icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
      />
    </Modal>
  );
};

export default ShareModal;
