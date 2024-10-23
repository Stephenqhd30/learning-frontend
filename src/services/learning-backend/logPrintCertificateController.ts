// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addLogPrintCertificate POST /api/logPrintCertificate/add */
export async function addLogPrintCertificateUsingPost(
  body: API.LogPrintCertificateAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/logPrintCertificate/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteLogPrintCertificate POST /api/logPrintCertificate/delete */
export async function deleteLogPrintCertificateUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/logPrintCertificate/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** downloadLogPrintCertificate GET /api/logPrintCertificate/download */
export async function downloadLogPrintCertificateUsingGet(options?: { [key: string]: any }) {
  return request<any>('/api/logPrintCertificate/download', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getUserCertificateVOById GET /api/logPrintCertificate/get/vo */
export async function getUserCertificateVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserCertificateVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLogPrintCertificateVO_>('/api/logPrintCertificate/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listLogPrintCertificateByPage POST /api/logPrintCertificate/list/page */
export async function listLogPrintCertificateByPageUsingPost(
  body: API.LogPrintCertificateQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageLogPrintCertificate_>('/api/logPrintCertificate/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listLogPrintCertificateVOByPage POST /api/logPrintCertificate/list/page/vo */
export async function listLogPrintCertificateVoByPageUsingPost(
  body: API.LogPrintCertificateQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageLogPrintCertificateVO_>(
    '/api/logPrintCertificate/list/page/vo',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** listMyLogPrintCertificateVOByPage POST /api/logPrintCertificate/my/list/page/vo */
export async function listMyLogPrintCertificateVoByPageUsingPost(
  body: API.LogPrintCertificateQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageLogPrintCertificateVO_>(
    '/api/logPrintCertificate/my/list/page/vo',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}
