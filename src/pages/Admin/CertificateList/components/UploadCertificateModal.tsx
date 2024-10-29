import '@umijs/max';
import { Button, message } from 'antd';
import React, { useState } from 'react';
import { ModalForm, ProForm, ProFormUploadDragger } from '@ant-design/pro-components';
import { importCertificateDataByExcelUsingPost } from '@/services/learning-backend/excelController';
import { UploadOutlined } from '@ant-design/icons';

interface CreateProps {
  onCancel: () => void;
  onSubmit: () => Promise<void>;
  visible: boolean;
}

/**
 * 常见弹窗
 * @param props
 * @constructor
 */
const UploadCertificateModal: React.FC<CreateProps> = (props) => {
  const { visible, onSubmit, onCancel } = props;
  // 是否是提交状态
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form] = ProForm.useForm();


  return (
    <ModalForm
      title={'批量导入证书信息'}
      open={visible}
      form={form}
      trigger={
        <Button icon={<UploadOutlined />}>
          批量导入证书信息
        </Button>
      }
      onFinish={async (values: any) => {
        // 避免重复提交
        if (submitting) return;
        setSubmitting(true);
        const hide = message.loading("正在导入证书信息，请稍候...")
        try {
          const res = await importCertificateDataByExcelUsingPost({
            file: values.file[0].originFileObj,
          });
          if (res.code === 0 && res?.data?.errorRecords.length === 0) {
            hide();
            message.success('证书信息导入成功');
            await onSubmit?.();
            return true;
          } else {
            hide();
            message.error(`证书信息导入失败${res?.data?.errorRecords?.errorMessage}` + '请重试');
          }
        } catch (error: any) {
          message.error(`证书信息导入失败${error.message}` + '请重试');
          return false;
        } finally {
          hide();
          setSubmitting(false);
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
          submitText: '上传',
          resetText: '取消',
        },
      }}
    >
      <ProFormUploadDragger
        onChange={async (info) => {
          const { status } = info.file;
          if (status === 'error') {
            message.error(`${info.file.name} 文件上传失败`);
          }
        }}
        name={'file'}
        max={1}
      />
    </ModalForm>
  );
};

export default UploadCertificateModal;
