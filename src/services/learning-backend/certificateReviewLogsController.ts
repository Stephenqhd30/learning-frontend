// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addCertificateReviewLogs POST /api/certificateReviewLogs/add */
export async function addCertificateReviewLogsUsingPost(
  body: API.CertificateReviewLogsAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/certificateReviewLogs/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** addCertificateReviewLogsByBatch POST /api/certificateReviewLogs/add/batch */
export async function addCertificateReviewLogsByBatchUsingPost(
  body: API.CertificateReviewLogsAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListLong_>('/api/certificateReviewLogs/add/batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getCertificateReviewLogsVOById GET /api/certificateReviewLogs/get/vo */
export async function getCertificateReviewLogsVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCertificateReviewLogsVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCertificateReviewLogsVO_>('/api/certificateReviewLogs/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listCertificateReviewLogsByPage POST /api/certificateReviewLogs/list/page */
export async function listCertificateReviewLogsByPageUsingPost(
  body: API.CertificateReviewLogsQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCertificateReviewLogs_>(
    '/api/certificateReviewLogs/list/page',
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

/** listCertificateReviewLogsVOByPage POST /api/certificateReviewLogs/list/page/vo */
export async function listCertificateReviewLogsVoByPageUsingPost(
  body: API.CertificateReviewLogsQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCertificateReviewLogsVO_>(
    '/api/certificateReviewLogs/list/page/vo',
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

/** listMyCertificateReviewLogsVOByPage POST /api/certificateReviewLogs/my/list/page/vo */
export async function listMyCertificateReviewLogsVoByPageUsingPost(
  body: API.CertificateReviewLogsQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCertificateReviewLogsVO_>(
    '/api/certificateReviewLogs/my/list/page/vo',
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
