import { LockOutlined, NumberOutlined, UserOutlined } from '@ant-design/icons';
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
          max: 18,
          min: 18,
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
          message: '身份证号是必填项！',
          max: 18,
          min: 18,
        },
      ]}
    />
    <ProFormText
      name="userNumber"
      fieldProps={{
        size: 'large',
        prefix: <NumberOutlined />,
      }}
      placeholder={'请输入您的学号'}
      rules={[
        {
          required: true,
          message: '学号是必填项',
          max: 10,
          min: 10,
       },
      ]}
    />
  </>
);

export default RegisterPage;
