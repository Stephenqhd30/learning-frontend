import {ActionType, ProColumns, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import React, {useRef} from 'react';
import {listMyCertificateVoByPageUsingPost} from '@/services/stephen-backend/certificateController';
import {CertificateSituationEnum} from '@/enums/CertificateSituationEnum';
import {CertificateTypeEnum} from '@/enums/CertificateTypeEnum';
import {ReviewStatus} from '@/enums/ReviewStatus';

/**
 * 用户管理列表
 * @constructor
 */
const MyCertificateList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /**
   * 表格列数据
   */
  const columns: ProColumns<API.Certificate>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '创建人id',
      dataIndex: 'userId',
      valueType: 'text',
      hideInSearch: true,
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
  ];
  return (
      <ProTable<API.Certificate, API.PageParams>
        headerTitle={'我的证书列表'}
        actionRef={actionRef}
        rowKey={'key'}
        search={{
          labelWidth: 120,
        }}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
          const { data, code } = await listMyCertificateVoByPageUsingPost({
            ...params,
            ...filter,
            sortField,
            sortOrder,
            reviewStatus: ReviewStatus.PASS
          } as API.CertificateQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: data?.total || 0,
          };
        }}
        columns={columns}
      />
  );
};
export default MyCertificateList;
