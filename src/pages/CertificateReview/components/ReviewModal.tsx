import {Drawer, message, Modal} from 'antd';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import React from 'react';
import { doCertificateReviewUsingPost } from '@/services/stephen-backend/certificateController';

interface ReviewModalProps {
  visible: boolean;
  onCancel?: () => void;
  columns: ProColumns<API.Certificate>[];
  certificate: API.Certificate;
  onSubmit: (values: API.ReviewRequest) => Promise<void>;
}

const ReviewModal: React.FC<ReviewModalProps> = (props) => {
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
        onSubmit={async (values: API.ReviewRequest) => {
          try {
            const success = await doCertificateReviewUsingPost({
              ...values,
              id: certificate.id,
            });
            if (success) {
              onSubmit?.(values);
              message.success('审核通过');
            }
          } catch (error: any) {
            message.error('审核失败' + error.message);
          }
        }}
      />
    </Modal>
  );
};

export default ReviewModal;
