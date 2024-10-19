import React from 'react';
import { Modal } from 'antd';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';

interface Props {
  courseInfo: API.CourseVO;
  visible: boolean;
  onCancel: () => void;
}

/**
 * 课程详细
 * @param props
 * @constructor
 */
const CourseDetailsModal: React.FC<Props> = (props) => {
  const { courseInfo, visible, onCancel } = props;
  return (
    <Modal
      title={'证书详细'}
      destroyOnClose
      onCancel={() => onCancel?.()}
      open={visible}
      footer={null}
    >
      <ProCard>
        <ProDescriptions<API.CourseVO>
          column={1}
          dataSource={courseInfo}
          columns={[
            {
              title: 'id',
              dataIndex: 'id',
              valueType: 'text',
              hideInForm: true,
            },
            {
              title: '课程号',
              dataIndex: 'courseNumber',
              valueType: 'text',
            },
            {
              title: '课程名',
              dataIndex: 'courseName',
              valueType: 'text',
            },
            {
              title: '用户名',
              dataIndex: 'userVO',
              valueType: 'text',
              render: (_, entity) => {
                return entity.userVO?.userName;
              },
            },
            {
              title: '创建时间',
              dataIndex: 'createTime',
              valueType: 'date',
            },
            {
              title: '更新时间',
              dataIndex: 'updateTime',
              valueType: 'date',
            },
          ]}
        />
      </ProCard>
    </Modal>
  );
};

export default CourseDetailsModal;
