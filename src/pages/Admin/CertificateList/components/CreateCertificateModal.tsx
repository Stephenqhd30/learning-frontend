import {
  ProForm, ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormUploadDragger
} from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal, Select, UploadProps } from 'antd';
import React, { useState } from 'react';
import { addCertificateUsingPost } from '@/services/learning-backend/certificateController';
import { uploadFileUsingPost } from '@/services/learning-backend/fileController';
import { CertificateSituation, certificateSituationEnum } from '@/enums/CertificateSituationEnum';
import { CertificateType, certificateTypeEnum } from '@/enums/CertificateTypeEnum';

interface CreateProps {
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
      hide();
      message.success('添加成功');
      return true;
    } else {
      message.error('添加失败');
    }
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
const CreateCertificateModal: React.FC<CreateProps> = (props) => {
  const { visible, onSubmit, onCancel } = props;

  // 证书
  const [certificateUrl, setUserAvatar] = useState<string>('');
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
    <Modal destroyOnClose title={'新建证书'} onCancel={() => onCancel?.()} open={visible} footer>
      <ProForm<API.CertificateAddRequest>
        onFinish={async (values: API.CertificateAddRequest) => {
          const success = await handleAdd({
            ...values,
            certificateUrl
          });
          if (success) {
            onSubmit?.(values);
          }
        }}
      >
        <ProFormText name={'certificateNumber'} label={'证书编号'} />
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
export default CreateCertificateModal;
