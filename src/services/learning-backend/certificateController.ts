// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addCertificate POST /api/certificate/add */
export async function addCertificateUsingPost(
  body: API.CertificateAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/certificate/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteCertificate POST /api/certificate/delete */
export async function deleteCertificateUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/certificate/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getCertificateVOById GET /api/certificate/get/vo */
export async function getCertificateVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCertificateVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCertificateVO_>('/api/certificate/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listCertificateByPage POST /api/certificate/list/page */
export async function listCertificateByPageUsingPost(
  body: API.CertificateQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCertificate_>('/api/certificate/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listCertificateVOByPage POST /api/certificate/list/page/vo */
export async function listCertificateVoByPageUsingPost(
  body: API.CertificateQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCertificateVO_>('/api/certificate/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listCertificateForUserVOByPage POST /api/certificate/list/page/vo/user */
export async function listCertificateForUserVoByPageUsingPost(
  body: API.CertificateQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCertificateForUserVO_>('/api/certificate/list/page/vo/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMyCertificateVOByPage POST /api/certificate/my/list/page/vo */
export async function listMyCertificateVoByPageUsingPost(
  body: API.CertificateQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCertificateVO_>('/api/certificate/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMyCertificateForUserVOByPage POST /api/certificate/my/list/page/vo/user */
export async function listMyCertificateForUserVoByPageUsingPost(
  body: API.CertificateQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCertificateForUserVO_>(
    '/api/certificate/my/list/page/vo/user',
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

/** updateCertificate POST /api/certificate/update */
export async function updateCertificateUsingPost(
  body: API.CertificateUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/certificate/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listWaitPrintCertificateVOByPage POST /api/certificate/wait/print/list/page/vo */
export async function listWaitPrintCertificateVoByPageUsingPost(
  body: API.CertificateQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCertificateVO_>('/api/certificate/wait/print/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
