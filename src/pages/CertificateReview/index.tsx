import React, { useRef, useState } from 'react';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { CertificateSituationEnum } from '@/enums/CertificateSituationEnum';
import { CertificateTypeEnum } from '@/enums/CertificateTypeEnum';
import { message, Space, Typography } from 'antd';
import Index from '@/pages/IndexPage/compoents/UserInfoCard';
import { getUserByIdUsingGet } from '@/services/stephen-backend/userController';
import { listCertificateByPageUsingPost } from '@/services/stephen-backend/certificateController';
import { ReviewStatus, ReviewStatusEnum } from '@/enums/ReviewStatus';
import ReviewDrawer from '@/pages/CertificateReview/components/ReviewDrawer';

const CertificateReview: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [userDetails, setUserDetails] = useState<boolean>(false);
  const [review, setReview] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.Certificate>({});
  // 获得者用户信息
  const [userInfo, setUserInfo] = useState<API.User>({});
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
  const columns: ProColumns<API.Certificate>[] = [
    {
      title: '证书编号',
      dataIndex: 'certificateId',
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
      valueEnum: CertificateSituationEnum,
      hideInForm: true,
    },
    {
      title: '证书类型',
      dataIndex: 'certificateType',
      valueType: 'select',
      valueEnum: CertificateTypeEnum,
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
      valueEnum: ReviewStatusEnum,
    },
    {
      title: '审核信息',
      dataIndex: 'reviewMessage',
      valueType: 'text',
    },
    {
      title: '审核时间',
      dataIndex: 'reviewTime',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '审核人id',
      dataIndex: 'reviewerId',
      valueType: 'text',
      hideInForm: true,
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
              setUserDetails(true);
              await getCurrentUserInfo(record?.gainUserId);
              setCurrentRow(record);
            }}
          >
            查看获得者信息
          </Typography.Link>
          <Typography.Link
            key={'review'}
            onClick={async () => {
              setReview(true);
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
          const { data, code } = await listCertificateByPageUsingPost({
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
      />
      {/*获得者信息*/}
      {userDetails && (
        <Index
          visible={userDetails}
          onCancel={() => setUserDetails(false)}
          user={userInfo ?? {}}
        />
      )}
      {/*审核*/}
      {review && (
        <ReviewDrawer
          visible={review}
          onCancel={() => setReview(false)}
          certificate={currentRow ?? {}}
          columns={columns}
          onSubmit={async () => {
            setReview(false);
            actionRef.current?.reload();
          }}
        />
      )}
    </>
  );
};

export default CertificateReview;
