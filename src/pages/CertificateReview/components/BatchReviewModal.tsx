import { message, Select } from 'antd';
import {
  ModalForm,
  ProColumns,
  ProForm,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-components';
import React from 'react';
import { doCertificateReviewByBatchUsingPost } from '@/services/learning-backend/userCertificateController';
import { ReviewStatus, reviewStatusEnum } from '@/enums/ReviewStatusEnum';

interface ReviewModalProps {
  visible: boolean;
  onCancel?: () => void;
  columns: ProColumns<API.Certificate>[];
  selectedRowKeys: any[];
  onSubmit: (values: API.ReviewRequest) => Promise<void>;
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
      title={'批量导入用户课程信息'}
      open={visible}
      form={form}
      onFinish={async (values: API.ReviewRequest) => {
        try {
          const success = await doCertificateReviewByBatchUsingPost({
            ...values,
            idList: selectedRowKeys,
          });
          if (success) {
            onSubmit?.(values);
            message.success('审核信息已更新');
            onCancel?.();
          }
        } catch (error: any) {
          message.error('审核失败' + error.message);
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
