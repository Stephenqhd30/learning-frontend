import '@umijs/max';
import { Image } from 'antd';
import React from 'react';
import { IdcardOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import {CertificateSituation} from '@/enums/CertificateSituationEnum';
import {certificateTypeEnum} from '@/enums/CertificateTypeEnum';
import {ProCard} from '@ant-design/pro-components';

interface Props {
  certificate: API.CertificateVO;
}

/**
 * 证书卡片
 * @param props
 * @constructor
 */
const CertificateCard: React.FC<Props> = (props) => {
  const { certificate } = props;

  return (
    <ProCard bodyStyle={{ padding: 0}}>
      <Image src={certificate.certificateUrl} preview={false} alt={certificate.certificateName} />
      <p>
        <IdcardOutlined
          style={{
            marginRight: 8,
          }}
        />
        {certificate?.certificateName}
      </p>
      <p>
        <SmileOutlined
          style={{
            marginRight: 8,
          }}
        />
        {certificate?.certificateNumber}
      </p>
      <p>
        <UserOutlined
          style={{
            marginRight: 8,
          }}
        />
        {certificateTypeEnum[certificate?.certificateType as CertificateSituation].text}
      </p>
    </ProCard>
  );
};
export default CertificateCard;
