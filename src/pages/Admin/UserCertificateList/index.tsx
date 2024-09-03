import React, { useRef, useState } from 'react';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Space, Typography } from 'antd';
import { listUserCertificateVoByPageUsingPost } from '@/services/stephen-backend/userCertificateController';
import CertificateDetailsModal from '@/pages/Admin/UserCertificateList/components/CertificateDetailsModal';
import UserDetailsModal from '@/components/ReAccount/UserDetailsModal';

const UserCertificateList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  // 查看证书信息
  const [certificateDetails, setCertificateDetails] = useState<boolean>(false);
  // 查看用户信息
  const [userDetails, setUserDetails] = useState<boolean>(false);
  // 下载证书
  const [downloadCertificate, setDownloadCertificate] = useState<boolean>(false);
  // 当前用户的所点击的数据
  const [currentRow, setCurrentRow] = useState<API.UserCertificateVO>();
  /**
   * 表格列数据
   */
  const columns: ProColumns<API.UserCertificateVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '证书编号',
      dataIndex: 'certificateId',
      valueType: 'text',
    },
    {
      title: '获得人Id',
      dataIndex: 'userId',
      valueType: 'text',
    },
    {
      title: '获得人姓名',
      dataIndex: 'userVO',
      hideInSearch: true,
      valueType: 'text',
      render: (_, record) => record.userVO?.userName,
    },
    {
      title: '证书获得时间',
      dataIndex: 'gainTime',
      valueType: 'dateYear',
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
            onClick={() => {
              setUserDetails(true);
              setCurrentRow(record);
            }}
          >
            查看获得者信息
          </Typography.Link>
          <Typography.Link
            key={'certificate-details'}
            onClick={() => {
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
          const { data, code } = await listUserCertificateVoByPageUsingPost({
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
        <UserDetailsModal
          visible={userDetails}
          onCancel={() => setUserDetails(false)}
          user={currentRow?.userVO ?? {}}
        />
      )}
      {downloadCertificate && (
        <UserDetailsModal
          visible={downloadCertificate}
          onCancel={() => setDownloadCertificate(false)}
          user={currentRow?.userVO ?? {}}
        />
      )}
    </>
  );
};

export default UserCertificateList;
