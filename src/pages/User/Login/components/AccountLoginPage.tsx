import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { ProFormText } from '@ant-design/pro-components';

/**
 * 登录页面
 * @constructor
 */
const AccountLoginPage: React.FC = () => (
  <>
    {/* 用户注册填写的表单 */}
    <ProFormText
      name="userName"
      fieldProps={{
        size: 'large',
        prefix: <UserOutlined />,
      }}
      placeholder={'请输入姓名'}
      rules={[
        {
          required: true,
          message: '请输入合法姓名！',
          max: 10,
          min: 2,
          pattern: /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/, // 验证中文姓名
        },
      ]}
    />
    <ProFormText.Password
      name="userIdCard"
      fieldProps={{
        size: 'large',
        prefix: <LockOutlined />,
      }}
      placeholder={'请输入身份证号'}
      rules={[
        {
          required: true,
          message: '请输入合法身份证号！',
          max: 18,
          min: 18,
          pattern:
            /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, // 验证身份证号
        },
      ]}
    />
  </>
);

export default AccountLoginPage;
