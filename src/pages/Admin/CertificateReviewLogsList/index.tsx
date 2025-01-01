import React, { useRef } from 'react';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Select } from 'antd';
import { ReviewStatus, reviewStatusEnum } from '@/enums/ReviewStatusEnum';
import { listCertificateReviewLogsVoByPageUsingPost } from '@/services/learning-backend/certificateReviewLogsController';

/**
 * 证书审核记录
 * @constructor
 */
const CertificateReviewLogsList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /**
   * 表格列数据
   */
  const columns: ProColumns<API.CertificateReviewLogsVO>[] = [
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
      title: '审核人',
      dataIndex: 'reviewerId',
      valueType: 'text',
      hideInSearch: true,
      render: (_, record) => {
        return <div>{record?.reviewerVO?.userName}</div>;
      },
    },
    {
      title: '审核时间',
      dataIndex: 'reviewTime',
      valueType: 'date',
    },

    {
      title: '审核信息',
      dataIndex: 'reviewMessage',
      valueType: 'text',
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
  ];

  return (
    <>
      <ProTable<API.UserCertificate, API.PageParams>
        headerTitle={'审核记录'}
        actionRef={actionRef}
        rowKey={'id'}
        search={{
          labelWidth: 120,
        }}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
          const { data, code } = await listCertificateReviewLogsVoByPageUsingPost({
            ...params,
            ...filter,
            sortField,
            sortOrder,
          } as API.CertificateReviewLogsQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: data?.total || 0,
          };
        }}
        columns={columns}
      />
    </>
  );
};
export default CertificateReviewLogsList;
