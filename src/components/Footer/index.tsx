import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';
import {LEARNING_DEFAULT_MESSAGE, LEARNING_IPC, LEARNING_URL} from '@/constants';

const Footer: React.FC = () => {
  const defaultMessage = LEARNING_DEFAULT_MESSAGE;
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${defaultMessage} ${currentYear}`}
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'LEARNING_IPC',
          title: LEARNING_IPC,
          href: LEARNING_URL,
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
