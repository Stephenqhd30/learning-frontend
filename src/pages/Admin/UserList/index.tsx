import { DownloadOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import {ActionType, ProColumns, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message, Popconfirm, Select, Space, Tag, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import {
  deleteUserUsingPost,
  listUserByPageUsingPost,
} from '@/services/learning-backend/userController';
import { userRoleEnum } from '@/enums/UserRoleEnum';
import { UserGender, userGenderEnum } from '@/enums/UserGenderEnum';
import {
  CreateUserModal,
  UpdateUserModal,
  UploadUserModal,
} from '@/pages/Admin/UserList/components';
import { USER_EXAMPLE_EXCEL, USER_EXCEL } from '@/constants';
import {
  downloadUserExampleUsingGet,
  downloadUserUsingGet,
} from '@/services/learning-backend/excelController';


/**
 * 删除节点
 *
 * @param row
 */
const handleDelete = async (row: API.DeleteRequest) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await deleteUserUsingPost({
      id: row.id,
    });
    hide();
    message.success('删除成功');
  } catch (error: any) {
    hide();
    message.error(`删除失败${error.message}, 请重试!`);
  }
};

/**
 * 用户管理列表
 * @constructor
 */
const UserList: React.FC = () => {
  // 新建窗口的Modal框
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 更新窗口的Modal框
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  // 上传窗口的Modal框
  const [uploadModalVisible, setUploadModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户的所点击的数据
  const [currentRow, setCurrentRow] = useState<API.User>();



  /**
   * 下载用户信息
   */
  const downloadUserInfo = async () => {
    try {
      const res = await downloadUserUsingGet({
        responseType: 'blob',
      });
      // 创建 Blob 对象
      // @ts-ignore
      const url = window.URL.createObjectURL(new Blob([res]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', USER_EXCEL);
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
   * 下载用户示例数据
   */
  const downloadUserExample = async () => {
    try {
      const res = await downloadUserExampleUsingGet({
        responseType: 'blob',
      });
      // 创建 Blob 对象
      // @ts-ignore
      const url = window.URL.createObjectURL(new Blob([res]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', USER_EXAMPLE_EXCEL);
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
   * 表格列数据
   */
  const columns: ProColumns<API.User>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      valueType: 'text',
    },
    {
      title: '身份证号',
      dataIndex: 'userIdCard',
      valueType: 'password',
    },
    {
      title: '头像',
      dataIndex: 'userAvatar',
      valueType: 'image',
      fieldProps: {
        width: 64,
      },
      hideInSearch: true,
    },
    {
      title: '简介',
      dataIndex: 'userProfile',
      valueType: 'textarea',
    },
    {
      title: '电话',
      dataIndex: 'userPhone',
      valueType: 'password',
    },
    {
      title: '邮箱',
      dataIndex: 'userEmail',
      valueType: 'text',
    },
    {
      title: '性别',
      dataIndex: 'userGender',
      valueType: 'text',
      valueEnum: userGenderEnum,
      renderFormItem: () => {
        return (
          <Select>
            <Select.Option value={UserGender.MALE}>
              {userGenderEnum[UserGender.MALE].text}
            </Select.Option>
            <Select.Option value={UserGender.FEMALE}>
              {userGenderEnum[UserGender.FEMALE].text}
            </Select.Option>
            <Select.Option value={UserGender.SECURITY}>
              {userGenderEnum[UserGender.SECURITY].text}
            </Select.Option>
          </Select>
        );
      },
    },
    {
      title: '学号',
      dataIndex: 'userNumber',
      valueType: 'text',
    },
    {
      title: '权限',
      dataIndex: 'userRole',
      valueEnum: userRoleEnum,
      render: (_, record) => {
        // @ts-ignore
        const role = userRoleEnum[record.userRole];
        return <Tag color={role?.color}>{role.text}</Tag>;
      },
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
      <ProTable<API.User, API.PageParams>
        headerTitle={'用户查询'}
        actionRef={actionRef}
        rowKey={'id'}
        search={{
          labelWidth: 120,
        }}
        pagination={{
          pageSize: 10,
        }}
        toolBarRender={() => [
          <Space key={'space'} wrap>
            <Button
              icon={<PlusOutlined />}
              onClick={() => {
                setCreateModalVisible(true);
              }}
              type={'primary'}
            >
              新建用户
            </Button>

            <Button
              key={'export-example'}
              onClick={async () => {
                await downloadUserExample();
              }}
            >
              <DownloadOutlined />
              下载导入用户示例数据
            </Button>
            <Button
              key={'upload'}
              onClick={() => {
                setUploadModalVisible(true);
              }}
            >
              <UploadOutlined />
              批量导入用户信息
            </Button>
            <Button
              key={'export'}
              onClick={async () => {
                await downloadUserInfo();
              }}
            >
              <DownloadOutlined />
              导出用户信息
            </Button>
          </Space>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
          const { data, code } = await listUserByPageUsingPost({
            ...params,
            ...filter,
            sortField,
            sortOrder,
          } as API.UserQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: data?.total || 0,
          };
        }}
        columns={columns}
      />
      {/*新建表单的Modal框*/}
      {createModalVisible && (
        <CreateUserModal
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
      {/*更新表单的Modal框*/}
      {updateModalVisible && (
        <UpdateUserModal
          onCancel={() => {
            setUpdateModalVisible(false);
          }}
          onSubmit={async () => {
            setUpdateModalVisible(false);
            setCurrentRow(undefined);
            actionRef.current?.reload();
          }}
          visible={updateModalVisible}
          oldData={currentRow}
        />
      )}
      {/*上传用户信息的Modal框*/}
      {uploadModalVisible && (
        <UploadUserModal
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
export default UserList;
