import React, { useRef, useState } from 'react';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { certificateSituationEnum } from '@/enums/CertificateSituationEnum';
import { certificateTypeEnum } from '@/enums/CertificateTypeEnum';
import {Button, message, Select, Space, Typography} from 'antd';
import { getUserByIdUsingGet } from '@/services/learning-backend/userController';
import { listCertificateVoByPageUsingPost } from '@/services/learning-backend/certificateController';
import { BatchReviewModal, ReviewModal } from '@/pages/CertificateReview/components';
import { ReviewStatus, reviewStatusEnum } from '@/enums/ReviewStatusEnum';
import UserDetailsModal from '@/components/ReUser/UserDetailsModal';

const CertificateReview: React.FC = () => {
  const actionRef = useRef<ActionType>();
  // 用户详细 Modal 框
  const [userDetailsModal, setUserDetailsModal] = useState<boolean>(false);
  // 审核信息 Modal 框
  const [reviewModal, setReviewModal] = useState<boolean>(false);
  // 批量审核信息 Modal 框
  const [batchReviewModal, setBatchReviewModal] = useState<boolean>(false);
  // 当前行数据
  const [currentRow, setCurrentRow] = useState<API.Certificate>({});
  // 获得者用户信息
  const [userInfo, setUserInfo] = useState<API.User>({});
  // 选中行数据
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  /**
   * 获得者用户信息
   * @param userId 获得者用户id
   */
  const getCurrentUserInfo = async (userId: any) => {
    try {
      const res = await getUserByIdUsingGet({ id: userId });
      if (res.code === 0 && res.data) {
        setUserInfo(res.data);
      }
    } catch (error: any) {
      message.error('获取用户数据失败' + error.message);
    }
  };
  /**
   * 表格列数据
   */
  const columns: ProColumns<API.CertificateVO>[] = [
    {
      title: '证书编号',
      dataIndex: 'certificateNumber',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '证书获得时间',
      dataIndex: 'certificateYear',
      valueType: 'dateYear',
      hideInForm: true,
    },
    {
      title: '证书名称',
      dataIndex: 'certificateName',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '证书获得情况',
      dataIndex: 'certificateSituation',
      valueType: 'select',
      valueEnum: certificateSituationEnum,
      hideInForm: true,
    },
    {
      title: '证书地址',
      dataIndex: 'certificateUrl',
      valueType: 'image',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '证书类型',
      dataIndex: 'certificateType',
      valueType: 'select',
      valueEnum: certificateTypeEnum,
      hideInForm: true,
    },
    {
      title: '获得者id',
      dataIndex: 'gainUserId',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '审核状态',
      dataIndex: 'reviewStatus',
      valueType: 'select',
      valueEnum: reviewStatusEnum,
      renderFormItem: () => {
        return (
          <Select>
            <Select.Option value={ReviewStatus.REVIEWING}>
              {reviewStatusEnum[ReviewStatus.REVIEWING].text}
            </Select.Option>
            <Select.Option value={ReviewStatus.PASS}>
              {reviewStatusEnum[ReviewStatus.PASS].text}
            </Select.Option>
            <Select.Option value={ReviewStatus.REJECT}>
              {reviewStatusEnum[ReviewStatus.REJECT].text}
            </Select.Option>
          </Select>
        );
      },
    },
    {
      title: '审核信息',
      dataIndex: 'reviewMessage',
      valueType: 'textarea',
    },
    {
      title: '审核时间',
      dataIndex: 'reviewTime',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '审核人',
      dataIndex: 'reviewerId',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => <div>{record.userVO?.userName}</div>,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size={'middle'}>
          <Typography.Link
            key={'user-details'}
            onClick={async () => {
              setUserDetailsModal(true);
              await getCurrentUserInfo(record?.gainUserId);
              setCurrentRow(record);
            }}
          >
            查看获得者信息
          </Typography.Link>
          <Typography.Link
            key={'review'}
            onClick={async () => {
              setReviewModal(true);
              setCurrentRow(record);
            }}
          >
            审核信息
          </Typography.Link>
        </Space>
      ),
    },
  ];
  return (
    <>
      <ProTable<API.Certificate, API.PageParams>
        headerTitle={'证书审核'}
        rowKey={'id'}
        actionRef={actionRef}
        search={{
          labelWidth: 120,
        }}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
          const { data, code } = await listCertificateVoByPageUsingPost({
            ...params,
            ...filter,
            sortField,
            sortOrder,
            noId: ReviewStatus.PASS,
          } as API.CertificateQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: data?.total || 0,
          };
        }}
        columns={columns}
        rowSelection={{
          selectedRowKeys: selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        tableAlertOptionRender={() => {
          return (
            <Space>
              <Button
                type="primary"
                onClick={async () => {
                  setBatchReviewModal(true);
                  actionRef.current?.reload();
                }}
              >
                批量审核
              </Button>
            </Space>
          );
        }}
      />
      {/*查看获得者信息*/}
      {userDetailsModal && (
        <UserDetailsModal
          onCancel={() => setUserDetailsModal(false)}
          onSubmit={async () => {
            setUserDetailsModal(false);
            actionRef.current?.reload();
          }}
          userInfo={userInfo}
          visible={userDetailsModal}
        />
      )}
      {/*审核*/}
      {reviewModal && (
        <ReviewModal
          visible={reviewModal}
          onCancel={() => setReviewModal(false)}
          certificate={currentRow ?? {}}
          columns={columns}
          onSubmit={async () => {
            setReviewModal(false);
            actionRef.current?.reload();
          }}
        />
      )}
      {/*批量审核*/}
      {batchReviewModal && (
        <BatchReviewModal
          visible={batchReviewModal}
          onCancel={() => setBatchReviewModal(false)}
          selectedRowKeys={selectedRowKeys ?? []}
          columns={columns}
          onSubmit={async () => {
            setReviewModal(false);
            actionRef.current?.reload();
          }}
        />
      )}
    </>
  );
};

export default CertificateReview;
