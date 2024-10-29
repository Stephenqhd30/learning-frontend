import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import '@umijs/max';
import { message, Select, UploadProps } from 'antd';
import React, { useState } from 'react';
import { updateUserUsingPost } from '@/services/learning-backend/userController';
import { uploadFileUsingPost } from '@/services/learning-backend/fileController';
import { UserRole, userRoleEnum } from '@/enums/UserRoleEnum';
import { UserGender, userGenderEnum } from '@/enums/UserGenderEnum';

interface Props {
  oldData?: API.User;
  onCancel: () => void;
  onSubmit: (values: API.UserUpdateRequest) => Promise<void>;
  visible: boolean;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.UserUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    const res = await updateUserUsingPost(fields);
    if (res.code === 0 && res.data) {
      hide();
      message.success('更新成功');
      return true;
    }
    return false;
  } catch (error: any) {
    hide();
    message.error(`更新失败${error.message}, 请重试!`);
    return false;
  }
};

/**
 * 更新用户 Modal
 * @param props
 * @constructor
 */
const UpdateUserModal: React.FC<Props> = (props) => {
  const { oldData, visible, onSubmit, onCancel } = props;
  // 用户头像
  const [userAvatar, setUserAvatar] = useState<string>();
  const [form] = ProForm.useForm<API.UserUpdateRequest>();
  /**
   * 用户更新头像
   */
  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    customRequest: async (options: any) => {
      const { onSuccess, onError, file } = options;
      try {
        const res = await uploadFileUsingPost(
          {
            biz: 'user_avatar',
          },
          {
            file: file,
          },
          file,
        );
        onSuccess(res.data);
        setUserAvatar(res.data);
      } catch (error: any) {
        onError(error);
        message.error('文件上传失败', error.message);
      }
    },
    onRemove() {
      setUserAvatar(undefined);
    },
  };

  if (!oldData) {
    return <></>;
  }

  return (
    <ModalForm
      title={'更新用户信息'}
      open={visible}
      form={form}
      initialValues={oldData}
      onFinish={async (values: API.UserUpdateRequest) => {
        const success = await handleUpdate({
          ...values,
          id: oldData?.id,
          userAvatar,
        });
        if (success) {
          onSubmit?.(values);
        }
      }}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          onCancel?.();
        },
      }}
      submitter={{
        searchConfig: {
          submitText: '更新用户信息',
          resetText: '取消',
        },
      }}
    >
      <ProFormText name={'userName'} label={'用户名'} />
      <ProFormText name={'userIdCard'} label={'身份证号'} />
      <ProFormText name={'userNumber'} label={'学号'} />
      <ProFormTextArea name={'userProfile'} label={'简介'} />
      <ProFormText name={'userPhone'} label={'电话'} />
      <ProFormText name={'userEmail'} label={'邮箱'} />
      <ProFormUploadDragger
        title={'上传头像'}
        label={'头像'}
        max={1}
        fieldProps={{
          ...uploadProps,
        }}
        name="pic"
      />
      <ProFormSelect name={'userGender'} label={'性别'} valueEnum={userGenderEnum}>
        <Select>
          <Select.Option value={UserGender.MALE}>
            {userGenderEnum[UserGender.MALE].text}
          </Select.Option>
          <Select.Option value={UserGender.FEMALE}>
            {userGenderEnum[UserGender.FEMALE].text}
          </Select.Option>
          <Select.Option value={UserGender.SECURITY}>
            {userGenderEnum[UserGender.SECURITY].text}
          </Select.Option>
        </Select>
      </ProFormSelect>
      <ProFormSelect name={'userRole'} label={'权限'} valueEnum={userRoleEnum}>
        <Select>
          <Select.Option value={UserRole.ADMIN}>{userRoleEnum[UserRole.ADMIN].text}</Select.Option>
          <Select.Option value={UserRole.USER}>{userRoleEnum[UserRole.USER].text}</Select.Option>
          <Select.Option value={UserRole.BAN}>{userRoleEnum[UserRole.BAN].text}</Select.Option>
        </Select>
      </ProFormSelect>
    </ModalForm>
  );
};
export default UpdateUserModal;
