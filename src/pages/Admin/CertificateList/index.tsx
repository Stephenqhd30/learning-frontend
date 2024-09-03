import {EditOutlined, PlusOutlined} from '@ant-design/icons';
import {ActionType, ProColumns, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, message, Popconfirm, Space, Typography} from 'antd';
import React, {useRef, useState} from 'react';
import {
  deleteCertificateUsingPost,
  listCertificateByPageUsingPost
} from '@/services/stephen-backend/certificateController';
import {CertificateSituationEnum} from '@/enums/CertificateSituationEnum';
import {CertificateTypeEnum} from '@/enums/CertificateTypeEnum';
import {ReviewStatusEnum} from '@/enums/ReviewStatus';
import CreateCertificateDrawer from '@/pages/Admin/CertificateList/components/CreateCertificateDrawer';
import UpdateCertificateDrawer from '@/pages/Admin/CertificateList/components/UpdateCertificateDrawer';

/**
 * 删除节点
 *
 * @param row
 */
const handleDelete = async (row: API.DeleteRequest) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await deleteCertificateUsingPost({
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
const CertificateList: React.FC = () => {
  // 新建窗口的Drawer框
  const [createDrawerVisible, setCreateDrawerVisible] = useState<boolean>(false);
  // 更新窗口的Drawer框
  const [updateDrawerVisible, setUpdateDrawerVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户的所点击的数据
  const [currentRow, setCurrentRow] = useState<API.Certificate>();

  /**
   * 去审核信息页
   */
  const goDoReviewPage = () => {
    // 跳转至审核信息
    window.location.href = `/review/certificate`;
  }
  /**
   * 表格列数据
   */
  const columns: ProColumns<API.Certificate>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '创建人id',
      dataIndex: 'userId',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '证书名称',
      dataIndex: 'certificateName',
      valueType: 'text',
    },
    {
      title: '获得人id',
      dataIndex: 'gainUserId',
      valueType: 'text',
    },
    {
      title: '证书获得时间',
      dataIndex: 'certificateYear',
      valueType: 'dateYear',
    },
    {
      title: '证书获得情况',
      dataIndex: 'certificateSituation',
      valueType: 'select',
      valueEnum: CertificateSituationEnum,
    },
    {
      title: '证书类型',
      dataIndex: 'certificateType',
      valueType: 'select',
      valueEnum: CertificateTypeEnum,
    },
    {
      title: '证书下载地址',
      dataIndex: 'certificateUrl',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '审核状态',
      dataIndex: 'reviewStatus',
      valueType: 'select',
      valueEnum: ReviewStatusEnum,
      hideInForm: true,
    },
    {
      title: '审核信息',
      dataIndex: 'reviewMessage',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '审核人信息',
      dataIndex: 'reviewerId',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '审核时间',
      sorter: true,
      dataIndex: 'reviewTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
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
              setUpdateDrawerVisible(true);
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
      <ProTable<API.Certificate, API.PageParams>
        headerTitle={'证书列表'}
        actionRef={actionRef}
        rowKey={'key'}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateDrawerVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
          <Button
            type="primary"
            key="text"
            onClick={() => {
              goDoReviewPage();
            }}
          >
            <EditOutlined /> 审核信息
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
          const { data, code } = await listCertificateByPageUsingPost({
            ...params,
            ...filter,
            sortField,
            sortOrder,
          } as API.CertificateQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: data?.total || 0,
          };
        }}
        columns={columns}
      />

      {/*新建表单的Drawer框*/}
      {createDrawerVisible && (
        <CreateCertificateDrawer
          onCancel={() => {
            setCreateDrawerVisible(false);
          }}
          onSubmit={async () => {
            setCreateDrawerVisible(false);
            actionRef.current?.reload();
          }}
          visible={createDrawerVisible}
          columns={columns}
        />
      )}
      {/*更新表单的Drawer框*/}
      {updateDrawerVisible && (
        <UpdateCertificateDrawer
          onCancel={() => {
            setUpdateDrawerVisible(false);
          }}
          onSubmit={async () => {
            setUpdateDrawerVisible(false);
            setCurrentRow(undefined);
            actionRef.current?.reload();
          }}
          visible={updateDrawerVisible}
          columns={columns}
          oldData={currentRow}
        />
      )}
    </>
  );
};
export default CertificateList;
