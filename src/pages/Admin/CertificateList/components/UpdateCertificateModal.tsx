import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import '@umijs/max';
import { message, Select, UploadProps } from 'antd';
import React, { useState } from 'react';
import { updateCertificateUsingPost } from '@/services/learning-backend/certificateController';
import { CertificateSituation, certificateSituationEnum } from '@/enums/CertificateSituationEnum';
import { CertificateType, certificateTypeEnum } from '@/enums/CertificateTypeEnum';
import { uploadFileUsingPost } from '@/services/learning-backend/fileController';
import {FileUploadBiz} from '@/enums/FileUploadBizEnum';

interface UpdateProps {
  oldData?: API.Certificate;
  onCancel: () => void;
  onSubmit: (values: API.CertificateUpdateRequest) => Promise<void>;
  visible: boolean;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.CertificateUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    const res = await updateCertificateUsingPost(fields);
    if (res.code === 0 && res.data) {
      message.success('更新成功');
      return true;
    } else {
      message.error('更新失败，请重试');
      return false;
    }
  } catch (error: any) {
    message.error(`更新失败${error.message}, 请重试!`);
    return false;
  } finally {
    hide();
  }
};

/**
 * 更新证书信息
 * @param props
 * @constructor
 */
const UpdateCertificateModal: React.FC<UpdateProps> = (props) => {
  const { oldData, visible, onSubmit, onCancel } = props;
  const [form] = ProForm.useForm();
  // 证书
  const [certificateUrl, setCertificateUrl] = useState<any>(oldData?.certificateUrl);
  /**
   * 证书更新
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
            biz: FileUploadBiz.CERTIFICATE_URL,
          },
          {
            file: file,
          },
          file,
        );
        onSuccess(res.data);
        setCertificateUrl(res.data);
      } catch (error: any) {
        onError(error);
        message.error('文件上传失败', error.message);
      }
    },
    onRemove() {
      setCertificateUrl(undefined);
    },
  };

  if (!oldData) {
    return <></>;
  }

  return (
    <ModalForm
      title={'更新证书信息'}
      open={visible}
      form={form}
      initialValues={oldData}
      onFinish={async (values: API.CertificateUpdateRequest) => {
        const success = await handleUpdate({
          ...values,
          certificateUrl,
          id: oldData?.id,
          userId: oldData?.userId,
        });
        if (success) {
          await onSubmit?.(values);
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
          submitText: '更新证书信息',
          resetText: '取消',
        },
      }}
    >
      <ProFormText name={'certificateName'} label={'证书名称'} />
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
        name="pic"
      />
    </ModalForm>
  );
};
export default UpdateCertificateModal;
