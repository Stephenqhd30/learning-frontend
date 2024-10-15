import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal } from 'antd';
import React from 'react';
import { addCourseUsingPost } from '@/services/learning-backend/courseController';

interface CreateProps {
  onCancel: () => void;
  onSubmit: (values: API.CourseAddRequest) => Promise<void>;
  visible: boolean;
  columns: ProColumns<API.CourseVO>[];
}

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: API.CourseAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    const res = await addCourseUsingPost({
      ...fields,
    });
    if (res.code === 0 && res.data) {
      hide();
      message.success('添加成功');
      return true;
    } else {
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
const CreateCourseModal: React.FC<CreateProps> = (props) => {
  const { visible, onSubmit, onCancel, columns } = props;
  return (
    <Modal destroyOnClose title={'新建课程'} onCancel={() => onCancel?.()} open={visible} footer>
      <ProTable
        columns={columns}
        onSubmit={async (values: API.CourseAddRequest) => {
          const success = await handleAdd(values);
          if (success) {
            onSubmit?.(values);
          }
        }}
        type={'form'}
      />
    </Modal>
  );
};
export default CreateCourseModal;
