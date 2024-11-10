import { message } from 'antd';
import { ModalForm, ProColumns, ProForm, ProFormDatePicker } from '@ant-design/pro-components';
import React from 'react';
import { addLogPrintCertificatesUsingPost } from '@/services/learning-backend/logPrintCertificateController';
import { CourseSelect } from '@/components';

interface ReviewModalProps {
  visible: boolean;
  onCancel?: () => void;
  columns: ProColumns<API.Certificate>[];
  selectedRowKeys: any[];
  onSubmit: (values: API.LogPrintCertificateAddRequest) => Promise<void>;
}

/**
 * 批量打印证书模态框
 * @param props
 * @constructor
 */
const BatchPrintCertificateModal: React.FC<ReviewModalProps> = (props) => {
  const { visible, onCancel, selectedRowKeys, onSubmit } = props;
  const [form] = ProForm.useForm();
  return (
    <ModalForm
      title={'制作证书'}
      open={visible}
      form={form}
      onFinish={async (values: API.LogPrintCertificateAddRequest) => {
        const hide = message.loading('正在制作证书...');
        try {
          const res = await addLogPrintCertificatesUsingPost({
            ...values,
            certificateIds: selectedRowKeys
          });
          if (res.code === 0 && res.data) {
            onSubmit?.(values);
            message.success('证书生成成功');
          } else {
            message.error(`证书生成失败${res.message}`);
          }
        } catch (error: any) {
          message.error(`证书生成失败${error.message}`);
          return false;
        } finally {
          hide();
        }
      }}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          onCancel?.();
        }
      }}
      submitter={{
        searchConfig: {
          submitText: '生成证书',
          resetText: '取消'
        }
      }}
    >
      <CourseSelect  name={'courseId'} label={"请选择课程"}/>
      <ProFormDatePicker name={'finishTime'} label={'证书发放时间'}/>
    </ModalForm>
  );
};

export default BatchPrintCertificateModal;
