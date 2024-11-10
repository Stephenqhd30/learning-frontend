import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import React, { useRef, useState } from 'react';
import { listCertificateVoByPageUsingPost } from '@/services/learning-backend/certificateController';
import { CertificateSituation, certificateSituationEnum } from '@/enums/CertificateSituationEnum';
import { CertificateType, certificateTypeEnum } from '@/enums/CertificateTypeEnum';
import { Button, Select, Space, Typography } from 'antd';
import { UserDetailsModal } from '@/components';
import {
  BatchPrintCertificateModal,
  PrintCertificateModal,
} from '@/pages/CreateCertificate/components';


/**
 * 证书制作
 * @constructor
 */
const CreateCertificatePage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  // 当前行数据
  const [currentRow, setCurrentRow] = useState<API.CertificateVO>({});
  // 证书信息 Modal 框
  const [userDetailsModalVisible, setUserDetailsModalVisible] = useState<boolean>(false);
  // 打印证书信息 Modal 框
  const [printCertificateModalVisible, setPrintCertificateModalVisible] = useState<boolean>(false);
  // 批量打印证书信息 Modal 框
  const [batchPrintModalVisible, setBatchPrintModalVisible] = useState<boolean>(false);
  // 选中行数据
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  /**
   * 表格列数据
   */
  const columns: ProColumns<API.CertificateVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
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
      title: '证书名称',
      dataIndex: 'certificateName',
      valueType: 'text',
    },
    {
      title: '获得人',
      dataIndex: 'gainUserId',
      valueType: 'text',
      hideInSearch: true,
      render: (_, record) => <div>{record?.userVO?.userName}</div>,
    },
    {
      title: '证书获得时间',
      dataIndex: 'certificateYear',
      valueType: 'dateYear',
    },
    {
      title: '证书获得情况',
      dataIndex: 'certificateSituation',
      valueType: 'text',
      valueEnum: certificateSituationEnum,
      renderFormItem: () => {
        return (
          <Select>
            <Select.Option value={CertificateSituation.HAVE}>
              {certificateSituationEnum[CertificateSituation.HAVE].text}
            </Select.Option>
            <Select.Option value={CertificateSituation.NO}>
              {certificateSituationEnum[CertificateSituation.NO].text}
            </Select.Option>
          </Select>
        );
      },
    },
    {
      title: '证书类型',
      dataIndex: 'certificateType',
      valueType: 'text',
      valueEnum: certificateTypeEnum,
      renderFormItem: () => {
        return (
          <Select>
            <Select.Option value={CertificateType.CADRE_TRAINING}>
              {certificateTypeEnum[CertificateType.CADRE_TRAINING].text}
            </Select.Option>
            <Select.Option value={CertificateType.OTHERS}>
              {certificateTypeEnum[CertificateType.OTHERS].text}
            </Select.Option>
          </Select>
        );
      },
    },
    {
      title: '审核人',
      dataIndex: 'reviewerId',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => <div>{record?.userVO?.userName}</div>,
    },
    {
      title: '审核时间',
      sorter: true,
      dataIndex: 'reviewTime',
      valueType: 'dateTime',
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
            key="certificate"
            onClick={() => {
              setUserDetailsModalVisible(true);
              setCurrentRow(record);
              actionRef.current?.reload();
            }}
          >
            获得人信息
          </Typography.Link>
          <Typography.Link
            key="print"
            onClick={() => {
              setPrintCertificateModalVisible(true);
              setCurrentRow(record);
              actionRef.current?.reload();
            }}
          >
            制作证书
          </Typography.Link>
        </Space>
      ),
    },
  ];
  return (
    <>
      <ProTable<API.CertificateVO, API.PageParams>
        headerTitle={'待制作证书列表'}
        actionRef={actionRef}
        rowKey={'id'}
        search={{
          labelWidth: 120,
        }}
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
                  setBatchPrintModalVisible(true);
                  actionRef.current?.reload();
                }}
              >
                批量制作证书
              </Button>
            </Space>
          );
        }}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
          const { data, code } = await listCertificateVoByPageUsingPost({
            ...params,
            ...filter,
            sortField,
            sortOrder,
            certificateSituation: CertificateSituation.NO,
          } as API.CertificateQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: data?.total || 0,
          };
        }}
        columns={columns}
      />
      {/*获得人信息*/}
      {userDetailsModalVisible && (
        <UserDetailsModal
          visible={userDetailsModalVisible}
          onCancel={() => setUserDetailsModalVisible(false)}
          userInfo={currentRow?.userVO ?? {}}
          onSubmit={async () => {
            setUserDetailsModalVisible(false);
            actionRef.current?.reload();
          }}
        />
      )}
      {/*制作证书*/}
      {printCertificateModalVisible && (
        <PrintCertificateModal
          visible={printCertificateModalVisible}
          onCancel={() => setPrintCertificateModalVisible(false)}
          onSubmit={async () => {
            setPrintCertificateModalVisible(false);
            actionRef.current?.reload();
          }}
          certificate={currentRow}
        />
      )}
      {/*批量制作证书*/}
      {batchPrintModalVisible && (
        <BatchPrintCertificateModal
          visible={batchPrintModalVisible}
          onCancel={() => setBatchPrintModalVisible(false)}
          selectedRowKeys={selectedRowKeys ?? []}
          columns={columns}
          onSubmit={async () => {
            setBatchPrintModalVisible(false);
            actionRef.current?.reload();
          }}
        />
      )}
    </>
  );
};
export default CreateCertificatePage;
