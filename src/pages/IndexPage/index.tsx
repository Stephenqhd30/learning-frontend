import React from 'react';
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { listCertificateVoByPageUsingPost } from '@/services/stephen-backend/certificateController';
import { CertificateTypeEnum } from '@/enums/CertificateTypeEnum';
import { CertificateSituationEnum } from '@/enums/CertificateSituationEnum';
import { INDEX_PAGE_TITLE } from '@/constants';
import { ReviewStatus } from '@/enums/ReviewStatus';

const IndexPage: React.FC = () => {
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
  ];
  return (
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
    </PageContainer>
  );
};

export default IndexPage;
