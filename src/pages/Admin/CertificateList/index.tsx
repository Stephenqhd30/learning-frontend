import { DownloadOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import {ActionType, ProColumns, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message, Popconfirm, Select, Space, Typography } from 'antd';
import React, {useRef, useState} from 'react';
import {
  deleteCertificateUsingPost,
  listCertificateVoByPageUsingPost,
} from '@/services/learning-backend/certificateController';
import { CertificateSituation, certificateSituationEnum } from '@/enums/CertificateSituationEnum';
import { CertificateType, certificateTypeEnum } from '@/enums/CertificateTypeEnum';
import {
  CreateCertificateModal,
  UpdateCertificateModal,
  UploadCertificateModal,
} from '@/pages/Admin/CertificateList/components';
import { ReviewStatus, reviewStatusEnum } from '@/enums/ReviewStatusEnum';
import { CERTIFICATE_EXAMPLE_EXCEL, CERTIFICATE_EXCEL } from '@/constants';
import {
  downloadCertificateExampleUsingGet,
  downloadCertificateUsingGet,
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
 * 下载证书信息
 */
const downloadCertificateInfo = async () => {
  try {
    const res = await downloadCertificateUsingGet({
      responseType: 'blob',
    });

    // 创建 Blob 对象
    // @ts-ignore
    const url = window.URL.createObjectURL(new Blob([res]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', CERTIFICATE_EXCEL);
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
const downloadCertificateExample = async () => {
  try {
    const res = await downloadCertificateExampleUsingGet({
      responseType: 'blob',
    });

    // 创建 Blob 对象
    // @ts-ignore
    const url = window.URL.createObjectURL(new Blob([res]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', CERTIFICATE_EXAMPLE_EXCEL);
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
 * 用户管理列表
 * @constructor
 */
const CertificateList: React.FC = () => {
  // 新建窗口的Modal框
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 更新窗口的Modal框
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  // 上传窗口的Modal框
  const [uploadModalVisible, setUploadModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户的所点击的数据
  const [currentRow, setCurrentRow] = useState<API.Certificate>();

  /**
   * 去审核信息页
   */
  const goDoReviewPage = () => {
    // 跳转至审核信息
    window.location.href = `/review/certificate`;
  };
  /**
   * 表格列数据
   */
  const columns: ProColumns<API.CertificateVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '证书编号',
      dataIndex: 'certificateNumber',
      valueType: 'text',
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
      valueType: 'text',
      valueEnum: certificateSituationEnum,
      renderFormItem: () => {
        return (
          <Select>
            <Select.Option value={CertificateSituation.HAVE}>
              {certificateSituationEnum[CertificateSituation.HAVE].text}
            </Select.Option>
            <Select.Option value={CertificateSituation.NO}>
              {certificateSituationEnum[CertificateSituation.NO].text}
            </Select.Option>
          </Select>
        );
      },
    },
    {
      title: '证书类型',
      dataIndex: 'certificateType',
      valueType: 'text',
      valueEnum: certificateTypeEnum,
      renderFormItem: () => {
        return (
          <Select>
            <Select.Option value={CertificateType.CADRE_TRAINING}>
              {certificateTypeEnum[CertificateType.CADRE_TRAINING].text}
            </Select.Option>
            <Select.Option value={CertificateType.OTHERS}>
              {certificateTypeEnum[CertificateType.OTHERS].text}
            </Select.Option>
          </Select>
        );
      },
    },
    {
      title: '证书地址',
      dataIndex: 'certificateUrl',
      valueType: 'image',
      hideInSearch: true,
    },
    {
      title: '审核状态',
      dataIndex: 'reviewStatus',
      valueType: 'select',
      valueEnum: reviewStatusEnum,
      hideInForm: true,
      renderFormItem: () => {
        return (
          <Select>
            <Select.Option value={ReviewStatus.REVIEWING}>
              {reviewStatusEnum[ReviewStatus.REVIEWING].text}
            </Select.Option>
            <Select.Option value={ReviewStatus.PASS}>
              {reviewStatusEnum[ReviewStatus.PASS].text}
            </Select.Option>
            <Select.Option value={ReviewStatus.REJECT}>
              {reviewStatusEnum[ReviewStatus.REJECT].text}
            </Select.Option>
          </Select>
        );
      },
    },
    {
      title: '审核信息',
      dataIndex: 'reviewMessage',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '审核人',
      dataIndex: 'reviewerId',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => <div>{record?.userVO?.userName}</div>,
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
      hideInTable: true,
    },
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
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
      <ProTable<API.Certificate, API.PageParams>
        headerTitle={'证书列表'}
        actionRef={actionRef}
        rowKey={'id'}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Space key={'space'} wrap size={'small'}>
            {/*新建证书表单*/}
            <Button
              icon={<PlusOutlined />}
              onClick={() => {
                setCreateModalVisible(true);
              }}
              type={'primary'}
            >
              新建证书
            </Button>
            <Button
              key={'export-example'}
              onClick={async () => {
                await downloadCertificateExample();
              }}
              icon={<DownloadOutlined />}
            >
              下载导入证书示例数据
            </Button>
            <Button
              key={'export'}
              onClick={async () => {
                await downloadCertificateInfo();
              }}
              icon={<DownloadOutlined />}
            >
              导出证书信息
            </Button>
            <Button
              key="text"
              onClick={() => {
                goDoReviewPage();
              }}
              icon={<EditOutlined />}
            >
              审核信息
            </Button>
          </Space>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
          const { data, code } = await listCertificateVoByPageUsingPost({
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
      {/*新建证书表单*/}
      {createModalVisible && (
        <CreateCertificateModal
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
        <UpdateCertificateModal
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
        <UploadCertificateModal
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
export default CertificateList;
