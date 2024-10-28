import { ProFormSelect } from '@ant-design/pro-components';
import React, { useEffect } from 'react';
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
  const { name, label = null, initialValue = null } = props;
  const { courseList, loadData } = useModel('courseSelect');

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ProFormSelect
      name={name}
      label={label}
      options={courseList.map((item) => ({
        label: item.courseName,
        value: item.id,
      }))}
      placeholder="请选择课程"
      allowClear
      showSearch
      initialValue={initialValue}
    />
  );
};

export default CourseSelect;
