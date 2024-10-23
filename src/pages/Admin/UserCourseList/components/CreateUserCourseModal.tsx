import { ProColumns, ProForm } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal } from 'antd';
import React from 'react';
import { addUserCourseUsingPost } from '@/services/learning-backend/userCourseController';
import { CourseSelect, UserSelect } from '@/components';

interface CreateProps {
  onCancel: () => void;
  onSubmit: (values: API.UserCourseAddRequest) => Promise<void>;
  visible: boolean;
  columns: ProColumns<API.UserCourseVO>[];
}

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: API.UserCourseAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    const res = await addUserCourseUsingPost({
      ...fields,
    });
    if (res.code === 0 && res.data) {
      hide();
      message.success('添加成功');
      return true;
    } else {
      hide();
      message.error(`添加失败${res.message}, 请重试!`);
      return false;
    }
  } catch (error: any) {
    hide();
    message.error(`添加失败${error.message}, 请重试!`);
    return false;
  }
};

/**
 * 常见弹窗
 * @param props
 * @constructor
 */
const CreateUserCourseModal: React.FC<CreateProps> = (props) => {
  const { visible, onSubmit, onCancel } = props;
  return (
    <Modal
      destroyOnClose
      title={'新建用户课程'}
      onCancel={() => onCancel?.()}
      open={visible}
      footer
    >
      <ProForm<API.UserCourseAddRequest>
        onFinish={async (values) => {
          const success = await handleAdd(values);
          if (success) {
            onSubmit?.(values);
          }
        }}
      >
        <CourseSelect name={'courseId'} label={'课程'} />
        <UserSelect name={'userId'} label={'用户id'} />
      </ProForm>
    </Modal>
  );
};
export default CreateUserCourseModal;
