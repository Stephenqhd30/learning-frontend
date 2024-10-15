import { Footer } from '@/components';
import { LoginForm, ProConfigProvider } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Image, message, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import { LEARNING_SUBTITLE, LEARNING_TITLE } from '@/constants';
import { userRegisterUsingPost } from '@/services/learning-backend/userController';
import RegisterPage from '@/pages/User/Register/components/RegisterPage';

const Register: React.FC = () => {
  const { token } = theme.useToken();
  const [redirected, setRedirected] = useState(false); // 控制重定向状态

  // 用户注册
  const handleRegisterSubmit = async (values: API.UserRegisterRequest) => {
    try {
      // 注册
      await userRegisterUsingPost({
        ...values,
      });
      const defaultLoginSuccessMessage = '注册成功！';
      message.success(defaultLoginSuccessMessage);
      return;
    } catch (error: any) {
      const defaultLoginFailureMessage = `注册失败${error.message}, 请重试！`;
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };

  // useEffect 监听 redirected 状态的变化
  useEffect(() => {
    if (redirected) {
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/user/login');
    }
  }, [redirected]);

  return (
    <>
      <div
        style={{
          backgroundColor: token.colorBgContainer,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '85vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ProConfigProvider hashed={false}>
          <div style={{ backgroundColor: token.colorBgContainer }}>
            <LoginForm
              submitter={{
                searchConfig: {
                  submitText: '注册',
                },
              }}
              logo={<Image src={'/logo.svg'} preview={false} />}
              title={LEARNING_TITLE}
              subTitle={LEARNING_SUBTITLE}
              onFinish={async (values) => {
                await handleRegisterSubmit(values as API.UserRegisterRequest);
                setRedirected(true);
              }}
            >
              <RegisterPage key={'register'} />
            </LoginForm>
          </div>
        </ProConfigProvider>
      </div>
      <Footer />
    </>
  );
};
export default Register;
