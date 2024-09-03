import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Drawer, message } from 'antd';
import React from 'react';
import {addCertificateUsingPost} from '@/services/stephen-backend/certificateController';

interface CreateProps {
  onCancel: () => void;
  onSubmit: (values: API.CertificateAddRequest) => Promise<void>;
  visible: boolean;
  columns: ProColumns<API.Certificate>[];
}

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: API.CertificateAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    await addCertificateUsingPost({
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
const CreateCertificateDrawer: React.FC<CreateProps> = (props) => {
  const { visible, onSubmit, onCancel, columns } = props;
  return (
    <Drawer
      destroyOnClose
      title={"新建证书"}
      onClose={() => onCancel?.()}
      open={visible}
    >
      <ProTable
        columns={columns}
        onSubmit={async (values: API.CertificateAddRequest) => {
          const success = await handleAdd(values);
          if (success) {
            onSubmit?.(values);
          }
        }}
        type={'form'}
      />
    </Drawer>
  );
};
export default CreateCertificateDrawer;
