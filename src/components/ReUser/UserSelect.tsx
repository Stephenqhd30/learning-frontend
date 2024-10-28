import { ProFormSelect } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { useModel } from '@umijs/max';

interface Props {
  name: string;
  initialValue?: string;
  label?: string;
}

/**
 * 用户选择器
 * @param props
 * @constructor
 */
const UserSelect: React.FC<Props> = (props) => {
  const { name, label = null, initialValue = null } = props;
  const { userList, loadData } = useModel('userSelect');

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ProFormSelect
      name={name}
      label={label}
      options={userList.map((item) => ({
        // @ts-ignore
        label: item.userNumber + item.userName,
        value: item.id,
      }))}
      placeholder="请选择用户"
      allowClear
      showSearch
      initialValue={initialValue}
    />
  );
};

export default UserSelect;
