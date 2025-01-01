import { Avatar, message, Typography, UploadProps } from 'antd';
import React, { useState } from 'react';
import { updateMyUserUsingPost } from '@/services/learning-backend/userController';
import {
  ProCard,
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { AntDesignOutlined } from '@ant-design/icons';
import { uploadFileUsingPost } from '@/services/learning-backend/fileController';
import { FileUploadBiz } from '@/enums/FileUploadBizEnum';

interface BaseViewProps {
  user: API.User;
}

/**
 * 个人基础设置
 * @param props
 * @constructor
 */
const BaseView: React.FC<BaseViewProps> = (props) => {
  const { user } = props;
  const [userAvatar, setUserAvatar] = useState<string>();
  const [form] = ProForm.useForm<API.UserUpdateRequest>();
  /**
   * 更新用户信息
   * @param values
   */
  const handleUpdate = async (values: API.UserUpdateRequest) => {
    const hide = message.loading('正在更新');
    try {
      const res = await updateMyUserUsingPost({
        ...values,
        userAvatar: userAvatar,
      });
      if (res.code === 0 && res.data) {
        hide();
        message.success('更新成功');
        return true;
      }
    } catch (error: any) {
      hide();
      message.error(`更新失败${error.message}, 请重试!`);
      return false;
    }
  };

  /**
   * 用户更新头像
   */
  const updateProps: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    customRequest: async (options: any) => {
      const { onSuccess, onError, file } = options;
      try {
        const res = await uploadFileUsingPost(
          {
            biz: FileUploadBiz.USER_AVATAR,
          },
          {
            file: file,
          },
          file,
        );
        if (res.code === 0 && res.data) {
          onSuccess(res.data);
          setUserAvatar(res.data);
        }
      } catch (error: any) {
        onError(error);
        message.error('文件上传失败', error.message);
      }
    },
    onRemove() {
      setUserAvatar(undefined);
    },
  };

  return (
    <ProCard
      title={<Typography.Title level={5}>更新个人基本信息</Typography.Title>}
      headerBordered
      bodyStyle={{ padding: 4 }}
      headStyle={{ padding: 4 }}
    >
      <ProForm
        layout="vertical"
        onFinish={async (values) => {
          await handleUpdate(values);
        }}
        onReset={async () => {
          form.resetFields();
        }}
        submitter={{
          searchConfig: {
            submitText: '更新用户信息',
          },
          resetButtonProps: {

          },
        }}
        autoFocusFirstInput={false}
        form={form}
        initialValues={user}
      >
        <ProFormText name="userName" label="用户名" />
        <ProFormText name="userPhone" label="电话" />
        <ProFormText name={'userDepartment'} label={'院系'} />
        <ProFormText name={'userGrade'} label={'年级'} />
        <ProFormText name={'userMajor'} label={'专业'} />
        <Avatar
          size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 100, xxl: 120 }}
          icon={<AntDesignOutlined />}
          src={user?.userAvatar}
        />
        <ProFormUploadButton
          title={'上传头像'}
          max={1}
          fieldProps={{
            ...updateProps,
          }}
          name="pic"
        />
      </ProForm>
    </ProCard>
  );
};
export default BaseView;
