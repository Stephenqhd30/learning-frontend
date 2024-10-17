import {
  ProForm, ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormUploadDragger
} from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal, Select, UploadProps } from 'antd';
import React, { useState } from 'react';
import { updateCertificateUsingPost } from '@/services/learning-backend/certificateController';
import { CertificateSituation, certificateSituationEnum } from '@/enums/CertificateSituationEnum';
import { CertificateType, certificateTypeEnum } from '@/enums/CertificateTypeEnum';
import { uploadFileUsingPost } from '@/services/learning-backend/fileController';

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
      hide();
      message.success('更新成功');
      return true;
    } else {
      message.error('更新失败，请重试');
      return false;
    }
  } catch (error: any) {
    hide();
    message.error(`更新失败${error.message}, 请重试!`);
    return false;
  }
};

/**
 * 更新证书信息
 * @param props
 * @constructor
 */
const UpdateCertificateModal: React.FC<UpdateProps> = (props) => {
  const { oldData, visible, onSubmit, onCancel } = props;

  // 证书
  const [certificateUrl, setCertificateUrl] = useState<string>(oldData?.certificateUrl as string);
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
            biz: 'certificate_url',
          },
          {
            file: file,
          },
          file,
        );
        onSuccess(res.data);
        setCertificateUrl(res.data as string);
      } catch (error: any) {
        onError(error);
        message.error('文件上传失败', error.message);
      }
    },
    onRemove() {
      setCertificateUrl('');
    },
  };

  if (!oldData) {
    return <></>;
  }

  return (
    <Modal
      destroyOnClose
      title={'更新证书信息'}
      onCancel={() => onCancel?.()}
      open={visible}
      footer
    >
      <ProForm<API.CertificateUpdateRequest>
        onFinish={async (values: API.CertificateUpdateRequest) => {
          const success = await handleUpdate({
            ...values,
            certificateUrl: certificateUrl,
            id: oldData?.id,
          });
          if (success) {
            onSubmit?.(values);
          }
        }}
        initialValues={oldData}
      >
        <ProFormText name={'certificateName'} label={'证书名称'} />
        <ProFormText name={'gainUserId'} label={'获得者Id'} />
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
      </ProForm>
    </Modal>
  );
};
export default UpdateCertificateModal;
