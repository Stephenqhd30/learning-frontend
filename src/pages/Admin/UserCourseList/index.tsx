import React, { useRef, useState } from 'react';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Space, Typography } from 'antd';
import { listUserCourseVoByPageUsingPost } from '@/services/learning-backend/userCourseController';
import { UserDetailsModal } from '@/components';
import { CourseDetailsModal } from '@/pages/Admin/UserCourseList/components';

/**
 * 用户课程列表
 * @constructor
 */
const UserCourseList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  // 用户详细 Modal 框
  const [userDetailsModal, setUserDetailsModal] = useState<boolean>(false);
  // 课程信息 Modal 框
  const [courseDetailsModal, setCourseDetailsModal] = useState<boolean>(false);
  // 当前行数据
  const [currentRow, setCurrentRow] = useState<API.UserCourseVO>({});
  /**
   * 表格列数据
   */
  const columns: ProColumns<API.UserCourseVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
    },
    {
      title: '课程id',
      dataIndex: 'courseId',
      valueType: 'text',
    },
    {
      title: '用户id',
      dataIndex: 'userId',
      valueType: 'text',
    },
    {
      title: '课程名称',
      dataIndex: 'courseVO',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) => {
        return <Typography.Text> {record.courseVO?.courseName}</Typography.Text>;
      },
    },
    {
      title: '用户姓名',
      dataIndex: 'userVO',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => {
        return <Typography.Text> {record.userVO?.userName}</Typography.Text>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'date',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'date',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size={'middle'}>
          <Typography.Link
            key={'user-details'}
            onClick={async () => {
              setUserDetailsModal(true);
              setCurrentRow(record);
            }}
          >
            查看获得者信息
          </Typography.Link>
          <Typography.Link
            key={'course-details'}
            onClick={async () => {
              setCurrentRow(record);
              setCourseDetailsModal(true);
            }}
          >
            查看课程信息
          </Typography.Link>
        </Space>
      ),
    },
  ];
  return (
    <>
      <ProTable<API.UserCourseVO, API.PageParams>
        headerTitle={'证书审核'}
        rowKey={'id'}
        actionRef={actionRef}
        search={{
          labelWidth: 120,
        }}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
          const { data, code } = await listUserCourseVoByPageUsingPost({
            ...params,
            ...filter,
            sortField,
            sortOrder,
          } as API.UserCourseQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: data?.total || 0,
          };
        }}
        columns={columns}
      />
      {/*查看用户信息*/}
      {userDetailsModal && (
        <UserDetailsModal
          onCancel={() => setUserDetailsModal(false)}
          onSubmit={async () => {
            setUserDetailsModal(false);
            actionRef.current?.reload();
          }}
          userInfo={currentRow?.userVO || {}}
          visible={userDetailsModal}
        />
      )}
      {/*查看课程信息*/}
      {courseDetailsModal && (
        <CourseDetailsModal
          courseInfo={currentRow?.courseVO || {}}
          visible={courseDetailsModal}
          onCancel={() => {
            setCourseDetailsModal(false);
          }}
        />
      )}
    </>
  );
};

export default UserCourseList;
