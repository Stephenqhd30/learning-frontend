import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal, Select, UploadProps } from 'antd';
import React, { useState } from 'react';
import { addUserUsingPost } from '@/services/learning-backend/userController';
import { uploadFileUsingPost } from '@/services/learning-backend/fileController';
import {userRoleEnum, UserRole} from '@/enums/UserRoleEnum';
import {userGenderEnum, UserGender} from '@/enums/UserGenderEnum';
interface CreateProps {
  onCancel: () => void;
  onSubmit: (values: API.UserAddRequest) => Promise<void>;
  visible: boolean;
}

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: API.UserAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    await addUserUsingPost({
      ...fields,
    });
    hide();
    message.success('添加成功');
    return true;
  } catch (error: any) {
    hide();
    message.error(`添加失败${error.message}, 请重试!`);
    return false;
  }
};

/**
 * 常见弹窗
 * @param props
 * @constructor
 */
const CreateUserModal: React.FC<CreateProps> = (props) => {
  const { visible, onSubmit, onCancel } = props;
  // 用户头像
  const [userAvatar, setUserAvatar] = useState<string>('');
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
        setUserAvatar(res.data as string);
      } catch (error: any) {
        onError(error);
        message.error('文件上传失败', error.message);
      }
    },
    onRemove() {
      setUserAvatar('');
    },
  };

  return (
    <Modal
      destroyOnClose
      title={'新建用户'}
      onCancel={() => onCancel?.()}
      open={visible}
      footer={null}
    >
      <ProForm<API.UserAddRequest>
        onFinish={async (values: API.UserAddRequest) => {
          const success = await handleAdd({
            ...values,
            userAvatar: userAvatar,
          });
          if (success) {
            onSubmit?.(values);
          }
        }}
      >
        <ProFormText name={'userIdCard'} label={'身份证号'} />
        <ProFormText name={'userName'} label={'姓名'} />
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
            <Select.Option value={UserGender.FEMALE}>{userGenderEnum[UserGender.FEMALE].text}</Select.Option>
            <Select.Option value={UserGender.SECURITY}>{userGenderEnum[UserGender.SECURITY].text}</Select.Option>
          </Select>
        </ProFormSelect>
        <ProFormSelect name={'userRole'} label={'权限'} valueEnum={userRoleEnum}>
          <Select>
            <Select.Option value={UserRole.ADMIN}>
              {userRoleEnum[UserRole.ADMIN].text}
            </Select.Option>
            <Select.Option value={UserRole.USER}>{userRoleEnum[UserRole.USER].text}</Select.Option>
            <Select.Option value={UserRole.BAN}>{userRoleEnum[UserRole.BAN].text}</Select.Option>
          </Select>
        </ProFormSelect>
      </ProForm>
    </Modal>
  );
};
export default CreateUserModal;
