import React, { useRef, useState } from 'react';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space, Typography } from 'antd';
import {
  deleteUserCourseUsingPost,
  listUserCourseVoByPageUsingPost,
} from '@/services/learning-backend/userCourseController';
import { UserDetailsModal } from '@/components';
import { CourseDetailsModal, UploadUserCourseModal } from '@/pages/Admin/UserCourseList/components';
import { DownloadOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import CreateUserCourseModal from '@/pages/Admin/UserCourseList/components/CreateUserCourseModal';
import {
  downloadUserCourseExampleUsingGet,
  downloadUserCourseUsingGet
} from '@/services/learning-backend/excelController';
import { USER_COURSE_EXAMPLE_EXCEL, USER_COURSE_EXCEL } from '@/constants';
import dayjs from 'dayjs';

/**
 * 删除节点
 *
 * @param row
 */
const handleDelete = async (row: API.DeleteRequest) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    const res = await deleteUserCourseUsingPost({
      id: row.id,
    });
    if (res.code === 0 && res.data) {
      hide();
      message.success('删除成功');
    } else {
      hide();
      message.error(`删除失败,${res.message} 请重试!`);
    }
  } catch (error: any) {
    hide();
    message.error(`删除失败${error.message}, 请重试!`);
  }
};

/**
 * 下载用户课程信息
 */
const downloadUserCourseInfo = async () => {
  try {
    const res = await downloadUserCourseUsingGet({
      responseType: 'blob',
    });

    // 创建 Blob 对象
    // @ts-ignore
    const url = window.URL.createObjectURL(new Blob([res]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', USER_COURSE_EXCEL);
    document.body.appendChild(link);
    link.click();
    link.remove();

    // 释放对象 URL
    window.URL.revokeObjectURL(url);
  } catch (error: any) {
    message.error('导出失败: ' + error.message);
  }
};

/**
 * 下载课程示例数据
 */
const downloadUserCourseExample = async () => {
  try {
    const res = await downloadUserCourseExampleUsingGet({
      responseType: 'blob',
    });

    // 创建 Blob 对象
    // @ts-ignore
    const url = window.URL.createObjectURL(new Blob([res]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', USER_COURSE_EXAMPLE_EXCEL);
    document.body.appendChild(link);
    link.click();
    link.remove();

    // 释放对象 URL
    window.URL.revokeObjectURL(url);
  } catch (error: any) {
    message.error('导出失败: ' + error.message);
  }
};


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
  // 新建窗口的Modal框
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 上传窗口 Modal 框
  const [uploadModalVisible, setUploadModalVisible] = useState<boolean>(false);
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
      hideInForm: true,
      hideInTable: true,
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
      title: '用户名',
      dataIndex: 'userVO',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => {
        return <Typography.Text> {record.userVO?.userName}</Typography.Text>;
      },
    },
    {
      title: '开课时间',
      dataIndex: 'courseVO',
      valueType: 'date',
      render: (_, record) => {
        return (
          <Typography.Text>
            {dayjs(record?.courseVO?.acquisitionTime).format('YYYY-MM-DD')}
          </Typography.Text>
        );
      },
    },
    {
      title: '结课时间',
      dataIndex: 'courseVO',
      valueType: 'date',
      render: (_, record) => {
        return (
          <Typography.Text>
            {dayjs(record?.courseVO?.finishTime).format('YYYY-MM-DD')}
          </Typography.Text>
        );
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
            查看学生信息
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
          {/*删除表单用户的PopConfirm框*/}
          <Popconfirm
            title="确定删除？"
            description="删除后将无法恢复?"
            okText="确定"
            cancelText="取消"
            onConfirm={async () => {
              await handleDelete(record);
              actionRef.current?.reload();
            }}
          >
            <Typography.Link
              key={'delete'}
              type={'danger'}
              onClick={() => {
                setCurrentRow(record);
              }}
            >
              删除
            </Typography.Link>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      <ProTable<API.UserCourseVO, API.PageParams>
        headerTitle={'课程审核'}
        rowKey={'id'}
        actionRef={actionRef}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Space key={'space'} wrap>
            <Button
              key="create"
              type={'primary'}
              icon={<PlusOutlined/>}
              onClick={() => {
                setCreateModalVisible(true);
              }}
            >
              新建
            </Button>
            <Button
              icon={<DownloadOutlined/>}
              key={'export-example'}
              onClick={async () => {
                await downloadUserCourseExample();
              }}
            >
              下载导入课程示例数据
            </Button>
            <Button
              key={'upload'}
              icon={<UploadOutlined/>}
              onClick={() => {
                setUploadModalVisible(true);
              }}
            >

              批量导入用户课程信息
            </Button>
            <Button
              key={'export'}
              icon={<DownloadOutlined/>}
              onClick={async () => {
                await downloadUserCourseInfo();
              }}
            >
              导出用户课程信息
            </Button>
          </Space>
        ]}
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
      {/*创建用户课程*/}
      {createModalVisible && (
        <CreateUserCourseModal
          columns={columns}
          onCancel={() => {
            setCreateModalVisible(false);
          }}
          onSubmit={async () => {
            setCreateModalVisible(false);
            actionRef.current?.reload();
          }}
          visible={createModalVisible}
        />
      )}
      {/*上传用户课程信息*/}
      {uploadModalVisible && (
        <UploadUserCourseModal
          onCancel={() => {
            setUploadModalVisible(false);
          }}
          visible={uploadModalVisible}
          onSubmit={async () => {
            setUploadModalVisible(false);
            actionRef.current?.reload();
          }}
        />
      )}
    </>
  );
};

export default UserCourseList;
