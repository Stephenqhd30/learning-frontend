import React, {useRef, useState} from 'react';
import {ActionType, ProColumns, ProTable} from '@ant-design/pro-components';
import {Button, message, Space, Typography} from 'antd';
import {DownloadOutlined} from '@ant-design/icons';
import { listUserCertificateVoByPageUsingPost } from '@/services/learning-backend/userCertificateController';
import { USER_CERTIFICATE_EXCEL } from '@/constants';
import { CertificateDetailsModal, UserInfoCard } from '@/components';
import { downloadUserCertificateUsingGet } from '@/services/learning-backend/excelController';

/**
 * 用户证书列表
 * @constructor
 */
const UserCertificateList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  // 查看证书信息Modal
  const [certificateDetails, setCertificateDetails] = useState<boolean>(false);
  // 查看用户信息Modal
  const [userDetails, setUserDetails] = useState<boolean>(false);
  // 当前用户的所点击的数据
  const [currentRow, setCurrentRow] = useState<API.UserCertificateVO>();

  /**
   * 下载用户证书信息
   */
  const downloadUserCertificateInfo = async () => {
    try {
      const res = await downloadUserCertificateUsingGet({
        responseType: 'blob',
      });

      // 创建 Blob 对象
      // @ts-ignore
      const url = window.URL.createObjectURL(new Blob([res]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', USER_CERTIFICATE_EXCEL);
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
  const columns: ProColumns<API.UserCertificateVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '证书id',
      dataIndex: 'certificateId',
      valueType: 'text',
    },
    {
      title: '获得人Id',
      dataIndex: 'userId',
      valueType: 'text',
    },
    {
      title: '证书编号',
      dataIndex: 'certificateNumber',
      valueType: 'text',
      hideInSearch: true,
      render: (_, record) => <div>{record?.certificateVO?.certificateNumber}</div>,
    },
    {
      title: '证书名称',
      dataIndex: 'certificateName',
      valueType: 'text',
      hideInSearch: true,
      render: (_, record) => <div>{record?.certificateVO?.certificateName}</div>,
    },
    {
      title: '获得人姓名',
      dataIndex: 'userName',
      valueType: 'text',
      hideInSearch: true,
      render: (_, record) => <div>{record?.userVO?.userName}</div>,
    },
    {
      title: '获得人学号',
      dataIndex: 'userName',
      valueType: 'text',
      hideInSearch: true,
      render: (_, record) => <div>{record?.userVO?.userNumber}</div>,
    },
    {
      title: '证书获得时间',
      dataIndex: 'gainTime',
      valueType: 'dateYear',
      hideInSearch: true,
      render: (_, record) => <div>{record?.certificateVO?.certificateYear}</div>,
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
              setUserDetails(true);
              setCurrentRow(record);
            }}
          >
            查看获得者信息
          </Typography.Link>
          <Typography.Link
            key={'certificate-details'}
            onClick={async () => {
              setCertificateDetails(true);
              setCurrentRow(record);
            }}
          >
            查看证书信息
          </Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable<API.UserCertificate, API.PageParams>
        headerTitle={'查看证书信息'}
        actionRef={actionRef}
        rowKey={'id'}
        search={{
          labelWidth: 120,
        }}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
          const {data, code} = await listUserCertificateVoByPageUsingPost({
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
            <Button
              key={'export'}
              onClick={async () => {
                await downloadUserCertificateInfo();
              }}
            >
              <DownloadOutlined />
              导出证书信息
            </Button>
          </Space>,
        ]}
        columns={columns}
      />
      {certificateDetails && (
        <CertificateDetailsModal
          visible={certificateDetails}
          onCancel={() => setCertificateDetails(false)}
          certificate={currentRow?.certificateVO ?? {}}
        />
      )}
      {userDetails && (
        <UserInfoCard
          visible={userDetails}
          onCancel={() => setUserDetails(false)}
          user={currentRow?.userVO ?? {}}
        />
      )}
    </>
  );
};

export default UserCertificateList;
