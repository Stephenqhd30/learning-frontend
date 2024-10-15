import React from 'react';
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import {
  listCertificateForUserVoByPageUsingPost,
} from '@/services/learning-backend/certificateController';
import { certificateType } from '@/enums/CertificateTypeEnum';
import { certificateSituation } from '@/enums/CertificateSituationEnum';
import { INDEX_PAGE_TITLE } from '@/constants';

const IndexPage: React.FC = () => {
  /**
   * 表格列数据
   */
  const columns: ProColumns<API.CertificateForUserVO>[] = [
    {
      title: '证书名称',
      dataIndex: 'certificateName',
      valueType: 'text',
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
      title: '证书获得情况',
      dataIndex: 'certificateSituation',
      valueType: 'select',
      valueEnum: certificateSituation,
    },
    {
      title: '证书类型',
      dataIndex: 'certificateType',
      valueType: 'select',
      valueEnum: certificateType,
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
          const { data, code } = await listCertificateForUserVoByPageUsingPost({
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
    </PageContainer>
  );
};

export default IndexPage;
