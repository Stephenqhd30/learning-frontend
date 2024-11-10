import { message, Select } from 'antd';
import { ModalForm, ProForm, ProFormSelect, ProFormTextArea } from '@ant-design/pro-components';
import React from 'react';
import { doCertificateReviewUsingPost } from '@/services/learning-backend/userCertificateController';
import { ReviewStatus, reviewStatusEnum } from '@/enums/ReviewStatusEnum';

interface ReviewModalProps {
  visible: boolean;
  onCancel?: () => void;
  certificate: API.Certificate;
  onSubmit: (values: API.ReviewRequest) => Promise<void>;
}


/**
 * 审核信息模态框
 * @param props
 * @constructor
 */
const ReviewModal: React.FC<ReviewModalProps> = (props) => {
  const { visible, onCancel, certificate, onSubmit } = props;
  const [form] = ProForm.useForm();
  return (
    <ModalForm
      title={'批量导入用户课程信息'}
      open={visible}
      form={form}
      initialValues={certificate}
      onFinish={async (values: API.ReviewRequest) => {
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
      <ProFormTextArea name={'reviewMessage'} label={"审核信息"}/>
    </ModalForm>
  );
};

export default ReviewModal;
