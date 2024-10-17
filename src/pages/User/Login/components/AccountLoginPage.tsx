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
      placeholder={'请输入用户名'}
      rules={[
        {
          required: true,
          message: '账号是必填项！',
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
          message: '身份证号是必填项！',
          max: 18,
          min: 18,
        },
      ]}
    />
  </>
);

export default AccountLoginPage;
