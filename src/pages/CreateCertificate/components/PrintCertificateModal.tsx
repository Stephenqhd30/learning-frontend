import { message } from 'antd';
import { ModalForm, ProForm, ProFormDatePicker, ProFormSelect } from '@ant-design/pro-components';
import React, { useEffect } from 'react';
import { addLogPrintCertificateUsingPost } from '@/services/learning-backend/logPrintCertificateController';
import { listUserCourseVoByPageUsingPost } from '@/services/learning-backend/userCourseController';

interface ReviewModalProps {
  visible: boolean;
  onCancel?: () => void;
  certificate: API.Certificate;
  onSubmit: (values: API.LogPrintCertificateAddRequest) => Promise<void>;
}


/**
 * 打印证书
 * @param props
 * @constructor
 */
const PrintCertificateModal: React.FC<ReviewModalProps> = (props) => {
  const {visible, onCancel, certificate, onSubmit} = props;
  const [form] = ProForm.useForm<API.LogPrintCertificateAddRequest>();
  // 用户已加入队伍列表
  const [userCourseList, setUserCourseList] = React.useState<API.UserCourseVO[]>([]);

  const loadData = async () => {
    try {
      const res = await listUserCourseVoByPageUsingPost({
        userId: certificate.userId
      })
      if (res.code === 0 && res.data) {
        setUserCourseList(res.data?.records || []);
      } else {
        setUserCourseList([]);
        message.error(`获取用户已加入队伍列表失败${res.message}`);
      }
    } catch (error: any) {
      setUserCourseList([]);
      message.error(`获取用户已加入队伍列表失败${error.message}`);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ModalForm
      title={'制作证书'}
      open={visible}
      form={form}
      onFinish={async (values: API.LogPrintCertificateAddRequest) => {
        const hide = message.loading('正在制作证书...');
        try {
          const res = await addLogPrintCertificateUsingPost({
            ...values,
            certificateId: certificate.id,
            userId: certificate.userId,
          });
          if (res.code === 0 && res.data) {
            onSubmit?.(values);
            message.success('证书生成成功');
          } else {
            message.error(`证书生成失败${res.message}`);
          }
        } catch (error: any) {
          message.error(`证书生成失败${error.message}`);
          return false;
        } finally {
          hide();
        }
      }}
      initialValues={certificate}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          onCancel?.();
        }
      }}
      submitter={{
        searchConfig: {
          submitText: '生成证书',
          resetText: '取消'
        }
      }}
    >
      <ProFormSelect
        name={'courseId'}
        label={'课程号'}
        options={userCourseList.map((item) => ({
          label: item.courseVO?.courseName,
          value: item.courseVO?.id
        }))}
        placeholder="请选择课程"
        allowClear
        showSearch
      />
      <ProFormDatePicker name={'finishTime'} label={'证书发放时间'}/>
    </ModalForm>
  );
};

export default PrintCertificateModal;
