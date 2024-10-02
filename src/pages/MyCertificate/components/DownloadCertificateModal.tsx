import { Button, Image, message, Modal, Space } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';

interface Props {
  visible: boolean;
  onCancel?: () => void;
  certificateInfo: API.Certificate;
  onSubmit: () => Promise<void>;
}

/**
 * 批量审核弹窗
 * @param props
 * @constructor
 */
const DownloadCertificateModal: React.FC<Props> = (props) => {
  const { visible, onCancel, onSubmit, certificateInfo } = props;
  /**
   * 下载证书信息
   */
  const handDownload = async () => {
    try {
      const link = document.createElement('a');
      link.href = certificateInfo.certificateUrl as string;
      link.setAttribute('download', '证书信息.jpg');
      // 在新页面打开
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error: any) {
      message.error('下载失败: ' + error.message);
    }
  };

  return (
    <Modal
      destroyOnClose
      title={'查看下载证书'}
      onCancel={() => onCancel?.()}
      open={visible}
      width={900}
      footer
    >
      <ProCard>
        <Space direction="vertical" size="middle">
          <Image preview={false} src={certificateInfo.certificateUrl} />
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            target={'_blank'}
            onClick={async () => {
              await handDownload();
              onSubmit?.();
            }}
          >
            下载证书
          </Button>
        </Space>
      </ProCard>
    </Modal>
  );
};

export default DownloadCertificateModal;
