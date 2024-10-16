import React from 'react';
import { Modal, Typography } from 'antd';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { certificateSituationEnum } from '@/enums/CertificateSituationEnum';
import { certificateTypeEnum } from '@/enums/CertificateTypeEnum';

interface CertificateDetailsProps {
  certificate: API.CertificateVO;
  visible: boolean;
  onCancel: () => void;
}

const CertificateDetailsModal: React.FC<CertificateDetailsProps> = (props) => {
  const {certificate, visible, onCancel} = props;
  return (
    <>
      <Modal title={'证书详细'} destroyOnClose onCancel={onCancel} open={visible} onOk={onCancel} width={800}>
        <ProCard>
          <ProDescriptions<API.CertificateVO>
            column={1}
            title={
              <>
                <Typography.Title level={3}>{certificate?.certificateName}</Typography.Title>
              </>
            }
            dataSource={certificate}
            columns={[
              {
                title: '证书id',
                key: 'id',
                dataIndex: 'id'
              },
              {
                title: '证书编号',
                key: 'certificateNumber',
                dataIndex: 'certificateNumber'
              },
              {
                title: '证书名称',
                key: 'certificateName',
                dataIndex: 'certificateName'
              },
              {
                title: '获得者id',
                key: 'gainUserId',
                dataIndex: 'gainUserId'
              },
              {
                title: '证书获得情况',
                key: 'certificateSituation',
                dataIndex: 'certificateSituation',
                valueType: 'select',
                valueEnum: certificateSituationEnum
              },
              {
                title: '证书类型',
                key: 'certificateType',
                dataIndex: 'certificateType',
                valueType: 'select',
                valueEnum: certificateTypeEnum
              },
              {
                title: '证书获得时间',
                key: 'certificateYear',
                dataIndex: 'certificateYear',
                valueType: 'text'
              },
              {
                title: '证书下载地址',
                key: 'certificateUrl',
                dataIndex: 'certificateUrl',
                valueType: 'text',
                render: (_, record) => {
                  return (
                    <Typography.Link href={record?.certificateUrl} target={'_blank'}>{record?.certificateUrl}</Typography.Link>
                  )
                }
              }
            ]}
          />
        </ProCard>
      </Modal>
    </>
  );
};

export default CertificateDetailsModal;
