import { Footer } from '@/components';
import { LoginForm, ProConfigProvider } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Image, message, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import { userLoginUsingPost } from '@/services/learning-backend/userController';
import { LEARNING_SUBTITLE, LEARNING_TITLE } from '@/constants';
import AccountLoginPage from '@/pages/User/Login/components/AccountLoginPage';

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [redirected, setRedirected] = useState(false); // 控制重定向状态
  const { token } = theme.useToken();
  // 用户登录
  const handleLoginSubmit = async (values: API.UserLoginRequest) => {
    try {
      // 登录
      const res = await userLoginUsingPost({
        ...values,
      });
      if (res.code === 0 && res.data) {
        // 保存已登录的用户信息
        setInitialState({
          ...initialState,
          currentUser: res?.data,
        });
        setRedirected(true); // 设置重定向状态为 true
        message.success('登录成功！');
      } else {
        message.error(`登录失败${res.message}, 请重试！`);
      }
    } catch (error: any) {
      message.error(`登录失败${error.message}, 请重试！`);
    }
  };

  // useEffect 监听 redirected 状态的变化
  useEffect(() => {
    if (redirected) {
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');
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
              logo={<Image src={'/logo.svg'} preview={false} width={56}/>}
              title={LEARNING_TITLE}
              subTitle={LEARNING_SUBTITLE}
              onFinish={async (values) => {
                await handleLoginSubmit(values as API.UserLoginRequest);
                setRedirected(true);
              }}
            >
              <AccountLoginPage key={'account'} />
            </LoginForm>
          </div>
        </ProConfigProvider>
      </div>
      <Footer />
    </>
  );
};
export default Login;
