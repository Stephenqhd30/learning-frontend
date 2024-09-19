import React, { useState } from 'react';
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { WaterMark } from '@ant-design/pro-layout';
import { useModel } from '@@/exports';
import { listCertificateVoByPageUsingPost } from '@/services/stephen-backend/certificateController';
import { CertificateTypeEnum } from '@/enums/CertificateTypeEnum';
import { CertificateSituationEnum } from '@/enums/CertificateSituationEnum';
import { message, Space, Typography } from 'antd';
import { getUserVoByIdUsingGet } from '@/services/stephen-backend/userController';
import { INDEX_PAGE_TITLE } from '@/constants';
import { ReviewStatus } from '@/enums/ReviewStatus';
import UserInfoCard from '@/pages/IndexPage/compoents/UserInfoCard';

const IndexPage: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;

  // 查看用户信息
  const [userDetails, setUserDetails] = useState<boolean>(false);
  // 下载证书
  const [downloadCertificate, setDownloadCertificate] = useState<boolean>(false);
  // 当前用户的所点击的数据
  const [currentRow, setCurrentRow] = useState<API.CertificateVO>({});
  const [userInfo, setUserInfo] = useState<API.User>({});
  const getCurrentUserInfo = async (userId: any) => {
    try {
      const res = await getUserVoByIdUsingGet({ id: userId });
      if (res.code === 0 && res.data) {
        setUserInfo(res.data);
      }
    } catch (error: any) {
      message.error('获取用户数据失败' + error.message);
    }
  };
  /**
   * 表格列数据
   */
  const columns: ProColumns<API.CertificateVO>[] = [
    {
      title: '证书id',
      dataIndex: 'id',
      valueType: 'text',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '创建人id',
      dataIndex: 'userId',
      valueType: 'text',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '证书编号',
      dataIndex: 'certificateNumber',
      valueType: 'text',
    },
    {
      title: '证书获得时间',
      dataIndex: 'certificateYear',
      valueType: 'dateYear',
    },
    {
      title: '证书名称',
      dataIndex: 'certificateName',
      valueType: 'text',
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
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size={'middle'}>
          <Typography.Link
            key={'user-details'}
            onClick={async () => {
              setUserDetails(true);
              await getCurrentUserInfo(record?.gainUserId);
              setCurrentRow(record);
            }}
          >
            查看获得者信息
          </Typography.Link>
          <Typography.Link
            key={'download-certificate'}
            onClick={async () => {
              setDownloadCertificate(true);
              setCurrentRow(record);
            }}
          >
            下载证书
          </Typography.Link>
        </Space>
      ),
    },
  ];
  return (
    // @ts-ignore
    <WaterMark content={currentUser?.userName + ' - 河南开封科技传媒学院'}>
      <PageContainer title={INDEX_PAGE_TITLE}>
        <ProTable<API.Certificate, API.PageParams>
          headerTitle={'证书列表'}
          rowKey={'id'}
          search={{
            labelWidth: 120,
          }}
          request={async (params, sort, filter) => {
            const sortField = Object.keys(sort)?.[0];
            const sortOrder = sort?.[sortField] ?? undefined;
            const { data, code } = await listCertificateVoByPageUsingPost({
              ...params,
              ...filter,
              sortField,
              sortOrder,
              reviewStatus: ReviewStatus.PASS,
            } as API.CertificateQueryRequest);

            return {
              success: code === 0,
              data: data?.records || [],
              total: data?.total || 0,
            };
          }}
          columns={columns}
        />
        {userDetails && (
          <UserInfoCard
            visible={userDetails}
            onCancel={() => setUserDetails(false)}
            user={userInfo ?? {}}
          />
        )}
        {downloadCertificate && (
          <UserInfoCard
            visible={downloadCertificate}
            onCancel={() => setDownloadCertificate(false)}
            user={currentRow?.userVO ?? {}}
          />
        )}
      </PageContainer>
    </WaterMark>
  );
};

export default IndexPage;
