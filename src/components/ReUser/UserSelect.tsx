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
  const { name, label = '', initialValue = '' } = props;
  const { userList, loadData } = useModel('userSelect');
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ProFormSelect
      name={name}
      label={label}
      options={userList.map((item) => ({
        // @ts-ignore
        label: item.userName + item.userNumber,
        value: item.id,
      }))}
      placeholder="请选择"
      allowClear
      showSearch
      fieldProps={{
        value: value,
        onChange: (newValue) => {
          setValue(newValue);
        },
      }}
    />
  );
};

export default UserSelect;
