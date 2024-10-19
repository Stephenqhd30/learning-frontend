import React, { useRef, useState } from 'react';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space, Typography } from 'antd';
import { DownloadOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import {
  deleteCourseUsingPost,
  downloadCourseExampleUsingGet,
  downloadCourseUsingGet,
  listCourseVoByPageUsingPost,
} from '@/services/learning-backend/courseController';
import { CreateCourseModal, UpdateCourseModal, UploadCourseModal } from './components';

/**
 * 删除节点
 *
 * @param row
 */
const handleDelete = async (row: API.DeleteRequest) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    const res = await deleteCourseUsingPost({
      id: row.id,
    });
    if (res.code === 0 && res.data) {
      hide();
      message.success('删除成功');
    } else {
      message.error(`删除失败, 请重试!`);
    }
  } catch (error: any) {
    hide();
    message.error(`删除失败${error.message}, 请重试!`);
  }
};

/**
 * 下载课程课程信息
 */
const downloadCourseInfo = async () => {
  try {
    const res = await downloadCourseUsingGet({
      responseType: 'blob',
    });

    // 创建 Blob 对象
    // @ts-ignore
    const url = window.URL.createObjectURL(new Blob([res]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '课程信息.xlsx');
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
const downloadCourseExample = async () => {
  try {
    const res = await downloadCourseExampleUsingGet({
      responseType: 'blob',
    });

    // 创建 Blob 对象
    // @ts-ignore
    const url = window.URL.createObjectURL(new Blob([res]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '导入课程示例数据.xlsx');
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
 * 课程列表
 * @constructor
 */
const CourseList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  // 当前课程的所点击的数据
  const [currentRow, setCurrentRow] = useState<API.CourseVO>();
  // 创建课程 Modal 框
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 更新课程 Modal 框
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  // 上传窗口 Modal 框
  const [uploadModalVisible, setUploadModalVisible] = useState<boolean>(false);

  /**
   * 表格列数据
   */
  const columns: ProColumns<API.CourseVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '课程号',
      dataIndex: 'courseNumber',
      valueType: 'digit',
    },
    {
      title: '课程名',
      dataIndex: 'courseName',
      valueType: 'text',
    },
    {
      title: '创建人',
      dataIndex: 'userId',
      valueType: 'text',
      render: (_, record) => {
        return <div>{record?.userVO?.userName}</div>;
      },
      hideInSearch: true,
      hideInForm: true,
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
            key="update"
            onClick={() => {
              setUpdateModalVisible(true);
              setCurrentRow(record);
              actionRef.current?.reload();
            }}
          >
            修改
          </Typography.Link>
          {/*删除表单课程的PopConfirm框*/}
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
      <ProTable<API.CourseVO, API.PageParams>
        headerTitle={'查看课程信息'}
        actionRef={actionRef}
        rowKey={'id'}
        search={{
          labelWidth: 120,
        }}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
          const { data, code } = await listCourseVoByPageUsingPost({
            ...params,
            ...filter,
            sortField,
            sortOrder,
          } as API.UserCertificateQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: data?.total || 0,
          };
        }}
        toolBarRender={() => [
          <Space key={'space'} wrap size={'small'}>
            <Button key={'export'} type={'primary'} onClick={() => setCreateModalVisible(true)}>
              <PlusOutlined /> 新建
            </Button>
            <Button
              key={'export-example'}
              onClick={async () => {
                await downloadCourseExample();
              }}
            >
              <DownloadOutlined />
              下载导入课程示例数据
            </Button>
            <Button
              key={'upload'}
              onClick={() => {
                setUploadModalVisible(true);
              }}
            >
              <UploadOutlined />
              批量导入课程信息
            </Button>
            <Button
              key={'export'}
              onClick={async () => {
                await downloadCourseInfo();
              }}
            >
              <DownloadOutlined />
              导出课程信息
            </Button>
          </Space>,
        ]}
        columns={columns}
      />
      {createModalVisible && (
        <CreateCourseModal
          onCancel={() => {
            setCreateModalVisible(false);
          }}
          onSubmit={async () => {
            actionRef.current?.reload();
            setCreateModalVisible(false);
          }}
          visible={createModalVisible}
          columns={columns}
        />
      )}
      {updateModalVisible && (
        <UpdateCourseModal
          oldData={currentRow}
          onCancel={() => {
            setUpdateModalVisible(false);
          }}
          onSubmit={async () => {
            actionRef.current?.reload();
            setUpdateModalVisible(false);
          }}
          visible={updateModalVisible}
          columns={columns}
        />
      )}
      {/*上传课程信息*/}
      {uploadModalVisible && (
        <UploadCourseModal
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
export default CourseList;
