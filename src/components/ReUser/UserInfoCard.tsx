import React from 'react';
import {Image, Modal, Typography} from 'antd';
import {ProCard, ProDescriptions} from '@ant-design/pro-components';


interface CertificateDetailsProps {
  user: API.UserVO;
  visible: boolean;
  onCancel: () => void;
}

/**
 * 用户信息卡片
 * @param props
 * @constructor
 */
const UserInfoCard: React.FC<CertificateDetailsProps> = (props) => {
  const { user, visible, onCancel } = props;
  return (
    <Modal
      title={'用户详细'}
      destroyOnClose
      onCancel={onCancel}
      open={visible}
      width={800}
      onOk={onCancel}
    >

        <ProCard bordered={false} >
          <ProDescriptions<API.User>
            column={1}
            title={
              <>
                <Typography.Title level={3}>{user?.userName}</Typography.Title>
              </>
            }
            dataSource={user}
            emptyText={'该用户比较懒 还没有设置'}
            columns={[
              {
                title: '用户名',
                key: 'userName',
                dataIndex: 'userName',
                valueType: 'text'
              },
              {
                title: '身份证号',
                key: 'userIdCard',
                dataIndex: 'userIdCard',
                valueType: 'text',
                hideInDescriptions: true
              },
              {
                title: '简介',
                key: 'userProfile',
                dataIndex: 'userProfile',
                valueType: 'text'
              },
              {
                title: '邮箱',
                key: 'userEmail',
                dataIndex: 'userEmail',
                valueType: 'text'
              },
              {
                title: '电话',
                key: 'userPhone',
                dataIndex: 'userPhone',
                valueType: 'text'
              }
            ]}
          />
        </ProCard>
        <ProCard bordered={false} >
          <Image src={user?.userAvatar} width={296} height={296}/>
        </ProCard>
    </Modal>
  );
};

export default UserInfoCard;
