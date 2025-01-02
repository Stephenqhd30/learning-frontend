import React from 'react';
import { Modal } from 'antd';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import {courseStatusEnum} from '@/enums/CourseStatusEnum';

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
      title={'课程详细'}
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
              title: '课程状态',
              dataIndex: 'status',
              valueEnum: courseStatusEnum,
            },
            {
              title: '开课时间',
              dataIndex: 'startTime',
              valueType: 'date',
            },
            {
              title: '结课时间',
              dataIndex: 'endTime',
              valueType: 'date',
            },
          ]}
        />
      </ProCard>
    </Modal>
  );
};

export default CourseDetailsModal;
