import { Image, message } from 'antd';
import { ModalForm, ProCard } from '@ant-design/pro-components';
import React from 'react';

interface Props {
  visible: boolean;
  onCancel?: () => void;
  certificateInfo: API.CertificateVO;
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
    <ModalForm
      title={'查看下载证书'}
      open={visible}
      onFinish={async () => {
        await handDownload();
        onSubmit?.();
        return true;
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel?.(),
      }}
      submitter={{
        searchConfig: {
          submitText: '下载证书',
          resetText: '取消',
        },
      }}
    >
      <ProCard>
        <Image preview={false} src={certificateInfo.certificateUrl} />
      </ProCard>
    </ModalForm>
  );
};

export default DownloadCertificateModal;
