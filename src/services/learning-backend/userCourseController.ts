// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addUserCourse POST /api/userCourse/add */
export async function addUserCourseUsingPost(
  body: API.UserCourseAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/userCourse/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteUserCourse POST /api/userCourse/delete */
export async function deleteUserCourseUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/userCourse/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getUserCourseVOById GET /api/userCourse/get/vo */
export async function getUserCourseVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserCourseVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserCourseVO_>('/api/userCourse/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listUserCourseByPage POST /api/userCourse/list/page */
export async function listUserCourseByPageUsingPost(
  body: API.UserCourseQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserCourse_>('/api/userCourse/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listUserCourseVOByPage POST /api/userCourse/list/page/vo */
export async function listUserCourseVoByPageUsingPost(
  body: API.UserCourseQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserCourseVO_>('/api/userCourse/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMyUserCourseVOByPage POST /api/userCourse/my/list/page/vo */
export async function listMyUserCourseVoByPageUsingPost(
  body: API.UserCourseQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserCourseVO_>('/api/userCourse/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
