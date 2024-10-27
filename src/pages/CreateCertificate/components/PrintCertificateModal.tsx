import { message, Modal } from 'antd';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import React from 'react';
import { doCertificateReviewUsingPost } from '@/services/learning-backend/certificateController';

interface ReviewModalProps {
  visible: boolean;
  onCancel?: () => void;
  columns: ProColumns<API.Certificate>[];
  certificate: API.Certificate;
  onSubmit: (values: API.ReviewRequest) => Promise<void>;
}

/**
 * 打印证书
 * @param props
 * @constructor
 */
const PrintCertificateModal: React.FC<ReviewModalProps> = (props) => {
  const { visible, onCancel, certificate, onSubmit, columns } = props;
  return (
    <Modal
      destroyOnClose
      title={'审核信息'}
      onCancel={() => onCancel?.()}
      open={visible}
      footer
    >
      <ProTable
        type={'form'}
        columns={columns}
        rowKey="id"
        form={{
          initialValues: certificate,
        }}
        onSubmit={async (values: API.ReviewRequest) => {
          try {
            const success = await doCertificateReviewUsingPost({
              ...values,
              id: certificate.id,
            });
            if (success) {
              onSubmit?.(values);
              message.success('审核信息已更新');
            }
          } catch (error: any) {
            message.error('审核失败' + error.message);
          }
        }}
      />
    </Modal>
  );
};

export default PrintCertificateModal;
