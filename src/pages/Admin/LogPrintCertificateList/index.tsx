import React, { useRef, useState } from 'react';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, message, Select, Space, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { UserGender, userGenderEnum } from '@/enums/UserGenderEnum';
import {
  downloadLogPrintCertificateUsingGet,
  listLogPrintCertificateVoByPageUsingPost
} from '@/services/learning-backend/logPrintCertificateController';
import { LOG_PRINT_CERTIFICATE_EXCEL } from '@/constants';
import {CertificateDetailsModal, UserInfoCard} from '@/components';

/**
 * 打印证书日志表
 * @constructor
 */
const LogPrintCertificateList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  // 查看证书信息Modal
  const [certificateDetails, setCertificateDetails] = useState<boolean>(false);
  // 查看用户信息Modal
  const [userDetails, setUserDetails] = useState<boolean>(false);
  // 当前用户的所点击的数据
  const [currentRow, setCurrentRow] = useState<API.UserCertificateVO>();

  /**
   * 下载用户证书信息
   */
  const downloadUserCertificateInfo = async () => {
    try {
      const res = await downloadLogPrintCertificateUsingGet({
        responseType: 'blob',
      });

      // 创建 Blob 对象
      // @ts-ignore
      const url = window.URL.createObjectURL(new Blob([res]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', LOG_PRINT_CERTIFICATE_EXCEL);
      document.body.appendChild(link);
      link.click();
      link.remove();

      // 释放对象 URL
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      message.error('导出失败: ' + error.message);
    }
  };

  /**
   * 表格列数据
   */
  const columns: ProColumns<API.LogPrintCertificate>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '获得人Id',
      dataIndex: 'userId',
      valueType: 'text',
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '证书id',
      dataIndex: 'certificateId',
      valueType: 'text',
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '课程id',
      dataIndex: 'courseId',
      valueType: 'text',
      hideInForm: true,
      hideInTable: true,
    },

    {
      title: '证书编号',
      dataIndex: 'certificateNumber',
      valueType: 'text',
    },
    {
      title: '获得人姓名',
      dataIndex: 'userName',
      valueType: 'text',
    },
    {
      title: '身份证号',
      dataIndex: 'userIdCard',
      valueType: 'text',
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '性别',
      dataIndex: 'userGender',
      valueType: 'text',
      valueEnum: userGenderEnum,
      renderFormItem: () => {
        return (
          <Select>
            <Select.Option value={UserGender.MALE}>
              {userGenderEnum[UserGender.MALE].text}
            </Select.Option>
            <Select.Option value={UserGender.FEMALE}>
              {userGenderEnum[UserGender.FEMALE].text}
            </Select.Option>
            <Select.Option value={UserGender.SECURITY}>
              {userGenderEnum[UserGender.SECURITY].text}
            </Select.Option>
          </Select>
        );
      },
    },
    {
      title: '课程名称',
      dataIndex: 'courseName',
      valueType: 'text',
    },
    {
      title: '开课时间',
      dataIndex: 'acquisitionTime',
      valueType: 'date',
    },
    {
      title: '结课时间',
      dataIndex: 'finishTime',
      valueType: 'date',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'date',
      hideInSearch: true,
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
              setCurrentRow(record);
            }}
          >
            查看获得者信息
          </Typography.Link>
          <Typography.Link
            key={'certificate-details'}
            onClick={async () => {
              setCertificateDetails(true);
              setCurrentRow(record);
            }}
          >
            查看证书信息
          </Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable<API.UserCertificate, API.PageParams>
        headerTitle={'打印证书日志'}
        actionRef={actionRef}
        rowKey={'id'}
        search={{
          labelWidth: 120,
        }}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
          const { data, code } = await listLogPrintCertificateVoByPageUsingPost({
            ...params,
            ...filter,
            sortField,
            sortOrder,
          } as API.LogPrintCertificateQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: data?.total || 0,
          };
        }}
        toolBarRender={() => [
          <Space key={'space'} wrap size={'small'}>
            <Button
              key={'export'}
              onClick={async () => {
                await downloadUserCertificateInfo();
              }}
            >
              <DownloadOutlined />
              导出打印证书日志信息
            </Button>
          </Space>,
        ]}
        columns={columns}
      />
      {certificateDetails && (
        <CertificateDetailsModal
          visible={certificateDetails}
          onCancel={() => setCertificateDetails(false)}
          certificate={currentRow?.certificateVO ?? {}}
        />
      )}
      {userDetails && (
        <UserInfoCard
          visible={userDetails}
          onCancel={() => setUserDetails(false)}
          user={currentRow?.userVO ?? {}}
        />
      )}
    </>
  );
};
export default LogPrintCertificateList;
