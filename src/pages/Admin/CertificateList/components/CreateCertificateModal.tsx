import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message, Select, UploadProps } from 'antd';
import React, { useState } from 'react';
import { addCertificateUsingPost } from '@/services/learning-backend/certificateController';
import { uploadFileUsingPost } from '@/services/learning-backend/fileController';
import { CertificateSituation, certificateSituationEnum } from '@/enums/CertificateSituationEnum';
import { CertificateType, certificateTypeEnum } from '@/enums/CertificateTypeEnum';
import { PlusOutlined } from '@ant-design/icons';
import { FileUploadBiz } from '@/enums/FileUploadBizEnum';

interface Props {
  onCancel: () => void;
  onSubmit: (values: API.CertificateAddRequest) => Promise<void>;
  visible: boolean;
}

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: API.CertificateAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    const res = await addCertificateUsingPost({
      ...fields,
    });
    if (res.code === 0 && res.data) {
      message.success('添加成功');
      return true;
    } else {
      message.error(`添加失败${res.message}, 请重试!`);
      return false;
    }
  } catch (error: any) {
    message.error(`添加失败${error.message}, 请重试!`);
    return false;
  } finally {
    hide();
  }
};

/**
 * 常见弹窗
 * @param props
 * @constructor
 */
const CreateCertificateModal: React.FC<Props> = (props) => {
  const { visible, onSubmit, onCancel } = props;
  const [form] = ProForm.useForm<API.CertificateAddRequest>();
  const [certificateUrl, setCertificateUrl] = useState<any>();

  // 上传证书信息
  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    customRequest: async ({ onSuccess, onError, file }) => {
      try {
        const res = await uploadFileUsingPost({ biz: FileUploadBiz.CERTIFICATE_URL }, { file });
        if (res.code === 0 && res.data) {
          setCertificateUrl(res.data);
          onSuccess?.(res.data);
        } else {
          message.error('文件上传失败: ' + (res.message || '请重试!'));
        }
      } catch (error: any) {
        onError?.(error);
        message.error('文件上传失败: ' + (error.message || '请重试!'));
      }
    },
    onRemove: () => {
      setCertificateUrl(undefined);
    },
  };
  return (
    <ModalForm
      title={'新建证书'}
      open={visible}
      form={form}
      onFinish={async (values: API.CertificateAddRequest) => {
        const success = await handleAdd({
          ...values,
          certificateUrl,
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
          submitText: '新建证书',
          resetText: '取消',
        },
      }}
    >
      <ProFormText name={'certificateNumber'} label={'证书编号'} />
      <ProFormText name={'certificateName'} label={'证书名称'} />
      <ProFormText name={'userName'} label={'获得者姓名'} />
      <ProFormText name={'userNumber'} label={'获得者学号'} />
      <ProFormDatePicker.Year name={'certificateYear'} label={'证书获得年份'} />
      <ProFormSelect
        name={'certificateSituation'}
        label={'证书获得情况'}
        valueEnum={certificateSituationEnum}
      >
        <Select>
          <Select.Option value={CertificateSituation.HAVE}>
            {certificateSituationEnum[CertificateSituation.HAVE].text}
          </Select.Option>
          <Select.Option value={CertificateSituation.NO}>
            {certificateSituationEnum[CertificateSituation.NO].text}
          </Select.Option>
        </Select>
      </ProFormSelect>
      <ProFormSelect name={'certificateType'} label={'证书类型'} valueEnum={certificateTypeEnum}>
        <Select>
          <Select.Option value={CertificateType.CADRE_TRAINING}>
            {certificateTypeEnum[CertificateType.CADRE_TRAINING].text}
          </Select.Option>
          <Select.Option value={CertificateType.OTHERS}>
            {certificateTypeEnum[CertificateType.OTHERS].text}
          </Select.Option>
        </Select>
      </ProFormSelect>
      <ProFormUploadDragger
        title={'上传证书'}
        label={'证书'}
        max={1}
        fieldProps={{
          ...uploadProps,
        }}
        name="certificateUrl"
      />
    </ModalForm>
  );
};
export default CreateCertificateModal;
