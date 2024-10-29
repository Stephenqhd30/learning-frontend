import '@umijs/max';
import { message, Modal } from 'antd';
import React, { useState } from 'react';
import { ProForm, ProFormUploadDragger } from '@ant-design/pro-components';
import { importCourseDataByExcelUsingPost } from '@/services/learning-backend/excelController';

interface Props {
  onCancel: () => void;
  onSubmit: () => Promise<void>;
  visible: boolean;
}

/**
 * 常见弹窗
 * @param props
 * @constructor
 */
const UploadCourseModal: React.FC<Props> = (props) => {
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
    const hide = message.loading("正在导入课程信息，请稍等...")
    try {
      const res = await importCourseDataByExcelUsingPost({
        file: values.file[0].originFileObj,
      });
      if (res.code === 0 && res?.data?.errorRecords.length === 0) {
        hide();
        message.success('课程信息导入成功');
        return true;
      } else {
        hide();
        message.error(`课程信息导入失败${res?.data?.errorRecords?.errorMessage}` + '请重试');
      }
    } catch (error: any) {
      message.error(`课程信息导入失败${error.message}` + '请重试');
      return false;
    } finally {
      hide();
      setSubmitting(false);
    }
  };

  return (
    <Modal
      destroyOnClose
      title={'批量导入课程信息'}
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
            if (status === 'error') {
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

export default UploadCourseModal;
