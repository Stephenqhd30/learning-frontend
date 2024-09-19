import { Footer } from '@/components';
import { LoginFormPage } from '@ant-design/pro-components';
import { Helmet, history, useModel } from '@umijs/max';
import { message, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { createStyles } from 'antd-style';
import { BACKGROUND_IMAGE, LEARNING_TITLE } from '@/constants';
import AccountLoginPage from '@/pages/User/Login/components/AccountLoginPage';
import { userLoginUsingPost } from '@/services/stephen-backend/userController';

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});


const Login: React.FC = () => {
  const {initialState, setInitialState} = useModel('@@initialState');
  const [redirected, setRedirected] = useState(false); // 控制重定向状态
  const {styles} = useStyles();
  // 用户登录
  const handleLoginSubmit = async (values: API.UserLoginRequest) => {
    try {
      // 登录
      const res = await userLoginUsingPost({
        ...values,
      });
      // 保存已登录的用户信息
      setInitialState({
        ...initialState,
        currentUser: res?.data,
      });
      setRedirected(true); // 设置重定向状态为 true
      message.success('登录成功！');
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
    <div className={styles.container}>
      <Helmet>
        <title>{LEARNING_TITLE}</title>
      </Helmet>
      <div
        style={{
          flex: '1 auto',
          padding: '16',
        }}
      >
        {/*用户登录的表单*/}
        <LoginFormPage
          backgroundImageUrl={BACKGROUND_IMAGE}
          containerStyle={{
            backdropFilter: 'blur(4px)',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title={LEARNING_TITLE}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleLoginSubmit(values as API.UserLoginRequest);
          }}
          actions={
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'left',
                flexDirection: 'column',
              }}
            >
              <Typography.Link href={'/user/register'}>去注册</Typography.Link>
            </div>
          }
        >
          <AccountLoginPage />
        </LoginFormPage>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
