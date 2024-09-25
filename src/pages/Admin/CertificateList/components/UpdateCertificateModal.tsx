import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import {Drawer, message, Modal} from 'antd';
import React from 'react';
import {updateCertificateUsingPost} from '@/services/stephen-backend/certificateController';

interface UpdateProps {
  oldData?: API.Certificate;
  onCancel: () => void;
  onSubmit: (values: API.CertificateUpdateRequest) => Promise<void>;
  visible: boolean;
  columns: ProColumns<API.Certificate>[];
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.CertificateUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    await updateCertificateUsingPost(fields);
    hide();
    message.success('更新成功');
    return true;
  } catch (error: any) {
    hide();
    message.error(`更新失败${error.message}, 请重试!`);
    return false;
  }
};
const UpdateCertificateModal: React.FC<UpdateProps> = (props) => {
  const { oldData, visible, onSubmit, onCancel, columns } = props;
  if (!oldData) {
    return <></>;
  }

  return (
    <Modal
      destroyOnClose
      title={"更新证书信息"}
      onCancel={() => onCancel?.()}
      open={visible}
      footer
    >
      <ProTable
        type={'form'}
        form={{
          initialValues: oldData,
        }}
        columns={columns}
        onSubmit={async (values: API.CertificateUpdateRequest) => {
          const success = await handleUpdate({
            ...values,
            id: oldData?.id,
          });
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Modal>
  );
};
export default UpdateCertificateModal;
