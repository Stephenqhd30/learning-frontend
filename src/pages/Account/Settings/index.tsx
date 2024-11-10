import { PageContainer, ProCard } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';

import { ACCOUNT_TITLE } from '@/constants';
import BaseView from '@/pages/Account/Settings/components/BaseView';
import { Grid } from 'antd';
import {useModel} from '@@/exports';

const { useBreakpoint } = Grid;

/**
 * 个人设置
 * @constructor
 */
const Settings: React.FC = () => {

  const { initialState } = useModel("@@initialState");
  const currentUser = initialState?.currentUser || {};
  const [activeKeyTab, setActiveKeyTab] = useState<string>(() => {
    return localStorage.getItem('activeKeyTab') || 'base';
  });

  useEffect(() => {
    localStorage.setItem('activeKeyTab', activeKeyTab);
  }, [activeKeyTab]);

  const screens = useBreakpoint();
  const isMobile = !screens.md; // 576px 以下为移动端

  return (
    <PageContainer title={ACCOUNT_TITLE}>
      <ProCard
        tabs={{
          tabPosition: isMobile ? 'top' : 'left',
          activeKey: activeKeyTab,
          items: [
            {
              label: `基本设置`,
              key: 'base',
              children: <BaseView user={currentUser}/>,
            },
          ],
          onChange: (activeKey) => {
            setActiveKeyTab(activeKey);
          },
        }}
      />
    </PageContainer>
  );
};

export default Settings;
