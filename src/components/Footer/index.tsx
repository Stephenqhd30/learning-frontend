import {DefaultFooter} from '@ant-design/pro-components';
import React from 'react';
import {
  LEARNING_DEFAULT_MESSAGE,
  LEARNING_IPC,
  LEARNING_IPC_URL,
  LEARNING_PUBLIC,
  LEARNING_PUBLIC_URL
} from '@/constants';
import {GlobalOutlined, SafetyCertificateOutlined} from '@ant-design/icons';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${LEARNING_DEFAULT_MESSAGE} ${currentYear}`}
      style={{
        background: 'none'
      }}
      links={[
        {
          key: 'LEARNING_IPC',
          title: (
            <>
              <SafetyCertificateOutlined style={{marginRight: 4}}/>
              备案号: {LEARNING_IPC}
            </>
          ),
          href: LEARNING_IPC_URL,
          blankTarget: true
        },
        {
          key: 'LEARNING_PUBLIC',
          title: (
            <>
              <GlobalOutlined style={{marginRight: 4}}/>
              {LEARNING_PUBLIC}
            </>
          ),
          href: LEARNING_PUBLIC_URL,
          blankTarget: true
        }
      ]}
    />
  );
};

export default Footer;
