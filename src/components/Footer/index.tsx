import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';
import {LEARNING_DEFAULT_MESSAGE, LEARNING_SUBTITLE} from '@/constants';

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
          key: 'LEARNING_SUBTITLE',
          title: LEARNING_SUBTITLE,
          href: "https://www.humc.edu.cn/",
          blankTarget: true
        },
      ]}
    />
  );
};

export default Footer;
