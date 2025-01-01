import { message, Select } from 'antd';
import {
  ModalForm,
  ProColumns,
  ProForm,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-components';
import React from 'react';
import { ReviewStatus, reviewStatusEnum } from '@/enums/ReviewStatusEnum';
import { addCertificateReviewLogsByBatchUsingPost } from '@/services/learning-backend/certificateReviewLogsController';

interface ReviewModalProps {
  visible: boolean;
  onCancel?: () => void;
  columns: ProColumns<API.Certificate>[];
  selectedRowKeys: any[];
  onSubmit: (values: API.CertificateReviewLogsAddRequest) => Promise<void>;
}

/**
 * 批量审核弹窗
 * @param props
 * @constructor
 */
const BatchReviewModal: React.FC<ReviewModalProps> = (props) => {
  const { visible, onCancel, selectedRowKeys, onSubmit } = props;
  const [form] = ProForm.useForm();
  return (
    <ModalForm
      title={'批量审核证书信息'}
      open={visible}
      form={form}
      onFinish={async (values: API.CertificateReviewLogsAddRequest) => {
        try {
          const success = await addCertificateReviewLogsByBatchUsingPost({
            ...values,
            idList: selectedRowKeys,
          });
          if (success.code === 0 && success.data) {
            onSubmit?.(values);
            message.success('审核信息已更新');
          } else {
            message.error(`审核失败`);
          }
        } catch (error: any) {
          message.error('审核失败' + error.message);
        } finally {
          onCancel?.();
        }
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          onCancel?.();
        },
      }}
      submitter={{
        searchConfig: {
          submitText: '审核',
          resetText: '取消',
        },
      }}
    >
      <ProFormSelect name={'reviewStatus'} label={'审核状态'}>
        <Select>
          <Select.Option value={ReviewStatus.REVIEWING}>
            {reviewStatusEnum[ReviewStatus.REVIEWING].text}
          </Select.Option>
          <Select.Option value={ReviewStatus.PASS}>
            {reviewStatusEnum[ReviewStatus.PASS].text}
          </Select.Option>
          <Select.Option value={ReviewStatus.REJECT}>
            {reviewStatusEnum[ReviewStatus.REJECT].text}
          </Select.Option>
        </Select>
      </ProFormSelect>
      <ProFormTextArea name={'reviewMessage'} label={'审核信息'} />
    </ModalForm>
  );
};

export default BatchReviewModal;
