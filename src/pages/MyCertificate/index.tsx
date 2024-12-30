import {ActionType, PageContainer, ProColumns, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import React, {useRef} from 'react';
import {listMyCertificateForUserVoByPageUsingPost} from '@/services/learning-backend/certificateController';
import {MY_CERTIFICATE_TITLE} from '@/constants';
import {CertificateSituation, certificateSituationEnum} from '@/enums/CertificateSituationEnum';
import {message, Select, Space, Typography} from 'antd';
import {ReviewStatus} from '@/enums/ReviewStatusEnum';
import {CertificateType, certificateTypeEnum} from '@/enums/CertificateTypeEnum';


/**
 * 我的证书
 * @constructor
 */
const MyCertificateList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  /**
   * 下载证书信息
   */
  const handDownload = async (certificateUrl: string) => {
    try {
      // 创建下载链接
      const link = document.createElement('a');
      link.href = certificateUrl;
      // 从 URL 提取文件名，或使用默认名称
      const fileName = certificateUrl.split('/').pop() || '我的证书.pdf';
      link.setAttribute('download', fileName);
      // 触发点击事件，启动文件下载
      document.body.appendChild(link);
      link.target = '_blank';
      link.click();
      document.body.removeChild(link);
      // 释放临时 URL
      window.URL.revokeObjectURL(certificateUrl);
      link.removeAttribute('download');
    } catch (error: any) {
      message.error('下载失败: ' + error.message);
    }
  };
  /**
   * 列表项
   */
  const columns: ProColumns<API.CertificateForUserVO>[] = [
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
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size={'middle'}>
          <Typography.Link
            key="update"
            onClick={async () => {
              await handDownload(record?.certificateUrl as string);
            }}
          >
            下载证书
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
      <ProTable<API.CertificateForUserVO, API.PageParams>
        actionRef={actionRef}
        rowKey={'id'}
        search={false}
          request={async (params, sort, filter) => {
            const sortField = Object.keys(sort)?.[0];
            const sortOrder = sort?.[sortField] ?? undefined;
            const { data, code } = await listMyCertificateForUserVoByPageUsingPost({
              ...params,
              ...filter,
              sortField,
              sortOrder,
              certificateSituation: CertificateSituation.HAVE,
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
    </PageContainer>
  );
};
export default MyCertificateList;
