// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** deleteUserCertificate POST /api/userCertificate/delete */
export async function deleteUserCertificateUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/userCertificate/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getUserCertificateVOById GET /api/userCertificate/get/vo */
export async function getUserCertificateVoByIdUsingGet1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserCertificateVOByIdUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserCertificateVO_>('/api/userCertificate/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listUserCertificateByPage POST /api/userCertificate/list/page */
export async function listUserCertificateByPageUsingPost(
  body: API.UserCertificateQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserCertificate_>('/api/userCertificate/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listUserCertificateVOByPage POST /api/userCertificate/list/page/vo */
export async function listUserCertificateVoByPageUsingPost(
  body: API.UserCertificateQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserCertificateVO_>('/api/userCertificate/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMyUserCertificateVOByPage POST /api/userCertificate/my/list/page/vo */
export async function listMyUserCertificateVoByPageUsingPost(
  body: API.UserCertificateQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserCertificateVO_>('/api/userCertificate/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
