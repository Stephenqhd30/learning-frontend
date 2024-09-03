import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { ProFormText } from '@ant-design/pro-components';

const RegisterPage: React.FC = () => (
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
          message: '用户名是必填项！',
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
        },
      ]}
    />
    <ProFormText.Password
      name="userCheckIdCard"
      fieldProps={{
        size: 'large',
        prefix: <LockOutlined />,
      }}
      placeholder={'请再次输入身份证号'}
      rules={[
        {
          required: true,
          message: '密码是必填项！',
        },
      ]}
    />
  </>
);

export default RegisterPage;
