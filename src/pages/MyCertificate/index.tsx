import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import React, { useRef, useState } from 'react';
import {listMyCertificateVoByPageUsingPost} from '@/services/stephen-backend/certificateController';
import {CertificateSituationEnum} from '@/enums/CertificateSituationEnum';
import {CertificateTypeEnum} from '@/enums/CertificateTypeEnum';
import { ReviewStatus } from '@/enums/ReviewStatus';
import { Space, Typography } from 'antd';
import { MY_CERTIFICATE_TITLE } from '@/constants';

/**
 * 用户管理列表
 * @constructor
 */
const MyCertificateList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  // 当前行数据
  const [currentRow, setCurrentRow] = useState<API.Certificate>({});
  // 证书信息 Modal 框
  const [certificateModal, setCertificateModal] = useState<boolean>(false);
  /**
   * 表格列数据
   */
  const columns: ProColumns<API.Certificate>[] = [
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
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size={'middle'}>
          <Typography.Link
            key={'review'}
            onClick={async () => {
              setCertificateModal(true);
              setCurrentRow(record);
            }}
          >
            查看下载证书
          </Typography.Link>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer
      header={{
        title: MY_CERTIFICATE_TITLE,
      }}
    >
      <ProTable<API.Certificate, API.PageParams>
        headerTitle={'我的证书列表'}
        actionRef={actionRef}
        rowKey={'key'}
        search={{
          labelWidth: 12,
        }}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
          const { data, code } = await listMyCertificateVoByPageUsingPost({
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
export default MyCertificateList;
