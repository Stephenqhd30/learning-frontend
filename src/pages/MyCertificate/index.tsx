import { ActionType, PageContainer, ProCard, ProList } from '@ant-design/pro-components';
import '@umijs/max';
import React, { useRef, useState } from 'react';
import { listMyCertificateForUserVoByPageUsingPost } from '@/services/learning-backend/certificateController';
import { MY_CERTIFICATE_TITLE } from '@/constants';
import { CertificateCard } from '@/components';
import { CertificateSituation } from '@/enums/CertificateSituationEnum';
import { Col, Row } from 'antd';
import { DownloadCertificateModal } from '@/pages/MyCertificate/components';


/**
 * 我的证书
 * @constructor
 */
const MyCertificateList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  // 当前行数据
  const [currentRow, setCurrentRow] = useState<API.Certificate>({});
  const [downloadModalVisible, setDownloadModalVisible] = useState<boolean>(false);
  // 表格加载状态
  const [loading, setLoading] = useState<boolean>(false);
  // 证书列表

  return (
    <PageContainer
      header={{
        title: MY_CERTIFICATE_TITLE,
      }}
    >
      <Row gutter={[4, 16]}>
        <ProList<API.CertificateVO>
          rowKey={'id'}
          actionRef={actionRef}
          loading={loading}
          ghost
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 3,
          }}
          request={async (params, sort, filter) => {
            setLoading(true);
            const sortField = Object.keys(sort)?.[0];
            const sortOrder = sort?.[sortField] ?? undefined;
            const { data, code } = await listMyCertificateForUserVoByPageUsingPost({
              ...params,
              ...filter,
              sortField,
              sortOrder,
              certificateSituation: CertificateSituation.HAVE,
            } as API.CertificateQueryRequest);
            setLoading(false);
            return {
              success: code === 0,
              data: data?.records || [],
              total: data?.total || 0,
            };
          }}
          renderItem={(certificate) => (
            <Col span={24}>
              <ProCard
                style={{ marginBottom: 16 }}
                onClick={() => {
                  setCurrentRow(certificate);
                  setDownloadModalVisible(true);
                }}
              >
                <CertificateCard certificate={certificate} />
              </ProCard>
            </Col>
          )}
        />
      </Row>
      {/*下载证书*/}
      {downloadModalVisible && (
        <DownloadCertificateModal
          visible={downloadModalVisible}
          onCancel={() => setDownloadModalVisible(false)}
          certificateInfo={currentRow}
          onSubmit={async () => {
            setDownloadModalVisible(false);
          }}
        />
      )}
    </PageContainer>
  );
};
export default MyCertificateList;
