import '@umijs/max';
import { message, Modal } from 'antd';
import React, { useState } from 'react';
import { importUserDataByExcelUsingPost } from '@/services/stephen-backend/userController';
import { ProForm, ProFormUploadDragger } from '@ant-design/pro-components';

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
const UploadUserModal: React.FC<CreateProps> = (props) => {
  const { visible, onSubmit, onCancel } = props;
  // 是否是提交状态
  const [submitting, setSubmitting] = useState<boolean>(false);

  /**
   * 表单提交
   * @param values
   */
  const onFinish = async (values: any) => {
    // 避免重复提交
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await importUserDataByExcelUsingPost({
        file: values.file[0].originFileObj,
      });
      if (res.code === 0 && res.data) {
        message.success('用户信息导入成功');
        return true;
      }
    } catch (error: any) {
      message.error(`用户信息导入失败${error.message}` + '请重试');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      destroyOnClose
      title={'批量导入用户信息'}
      onCancel={() => onCancel?.()}
      open={visible}
      footer
    >
      <ProForm
        onFinish={async (values) => {
          const success = await onFinish(values);
          if (success) {
            onSubmit?.();
          }
        }}
      >
        <ProFormUploadDragger
          onChange={async (info) => {
            const { status } = info.file;
            if (status === 'done') {
              message.success(`${info.file.name} 文件上传成功`);
            } else if (status === 'error') {
              message.error(`${info.file.name} 文件上传失败`);
            }
          }}
          name={'file'}
          label="拖拽上传"
          max={1}
        />
      </ProForm>
    </Modal>
  );
};

export default UploadUserModal;
