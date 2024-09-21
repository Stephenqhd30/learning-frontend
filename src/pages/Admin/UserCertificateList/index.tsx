import React, { useRef, useState } from 'react';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { message, Space, Typography } from 'antd';
import { listUserCertificateByPageUsingPost } from '@/services/stephen-backend/userCertificateController';
import CertificateDetailsModal from '@/pages/Admin/UserCertificateList/components/CertificateDetailsModal';
import UserInfoCard from '@/pages/IndexPage/compoents/UserInfoCard';
import { getUserVoByIdUsingGet } from '@/services/stephen-backend/userController';
import { getCertificateVoByIdUsingGet } from '@/services/stephen-backend/certificateController';

const UserCertificateList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  // 查看证书信息Drawer
  const [certificateDetails, setCertificateDetails] = useState<boolean>(false);
  // 查看用户信息Drawer
  const [userDetails, setUserDetails] = useState<boolean>(false);
  // 下载证书
  const [downloadCertificate, setDownloadCertificate] = useState<boolean>(false);
  // 当前用户的所点击的数据
  const [currentRow, setCurrentRow] = useState<API.UserCertificateVO>();
  // 证书获得者信息
  const [currentUserInfo, setCurrentUserInfo] = useState<API.UserVO>({});
  // 证书信息
  const [certificateInfo, setCertificateInfo] = useState<API.Certificate>({});
  /**
   * 获取用户信息
   * @param userId
   */
  const gainUserInfo = async (userId: any) => {
    try {
      const res = await getUserVoByIdUsingGet({
        id: userId,
      });
      if (res.code === 0 && res.data) {
        setCurrentUserInfo(res.data);
      }
    } catch (error: any) {
      message.error('获取用户信息失败：' + error.message);
    }
  };

  /**
   * 获取证书信息
   * @param certificateId
   */
  const getCertificateInfo = async (certificateId: any) => {
    try {
      const res = await getCertificateVoByIdUsingGet({
        id: certificateId,
      });
      if (res.code === 0 && res.data) {
        setCertificateInfo(res.data);
      }
    } catch (error: any) {
      message.error('获取用户信息失败：' + error.message);
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
    },
    {
      title: '获得人姓名',
      dataIndex: 'gainUserName',
      valueType: 'text',
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
            onClick={async () => {
              setUserDetails(true);
              setCurrentRow(record);
              await gainUserInfo(currentRow?.userId);
            }}
          >
            查看获得者信息
          </Typography.Link>
          <Typography.Link
            key={'certificate-details'}
            onClick={async () => {
              setCertificateDetails(true);
              setCurrentRow(record);
              await getCertificateInfo(currentRow?.certificateId);
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
          const { data, code } = await listUserCertificateByPageUsingPost({
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
          certificate={certificateInfo ?? {}}
        />
      )}
      {userDetails && (
        <UserInfoCard
          visible={userDetails}
          onCancel={() => setUserDetails(false)}
          user={currentUserInfo ?? {}}
        />
      )}
      {downloadCertificate && (
        <UserInfoCard
          visible={downloadCertificate}
          onCancel={() => setDownloadCertificate(false)}
          user={currentUserInfo ?? {}}
        />
      )}
    </>
  );
};

export default UserCertificateList;
