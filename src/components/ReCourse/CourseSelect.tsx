import { ProFormSelect } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { useModel } from '@umijs/max';

interface Props {
  name: string;
  initialValue?: string;
  label?: string;
}

/**
 * 课程选择器
 * @param props
 * @constructor
 */
const CourseSelect: React.FC<Props> = (props) => {
  const { name, label = '', initialValue = '' } = props;
  const { courseSelect, loadData } = useModel('courseSelect');
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ProFormSelect
      name={name}
      label={label}
      options={courseSelect.map((item) => ({
        label: item.courseName,
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

export default CourseSelect;
