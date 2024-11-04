// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** downloadCertificate GET /api/excel/certificate/download */
export async function downloadCertificateUsingGet(options?: { [key: string]: any }) {
  return request<any>('/api/excel/certificate/download', {
    method: 'GET',
    ...(options || {}),
  });
}

/** downloadCertificateExample GET /api/excel/certificate/download/example */
export async function downloadCertificateExampleUsingGet(options?: { [key: string]: any }) {
  return request<any>('/api/excel/certificate/download/example', {
    method: 'GET',
    ...(options || {}),
  });
}

/** importCertificateDataByExcel POST /api/excel/certificate/import */
export async function importCertificateDataByExcelUsingPost(
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.BaseResponseMapStringObject_>('/api/excel/certificate/import', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** downloadCourse GET /api/excel/course/download */
export async function downloadCourseUsingGet(options?: { [key: string]: any }) {
  return request<any>('/api/excel/course/download', {
    method: 'GET',
    ...(options || {}),
  });
}

/** downloadCourseExample GET /api/excel/course/download/example */
export async function downloadCourseExampleUsingGet(options?: { [key: string]: any }) {
  return request<any>('/api/excel/course/download/example', {
    method: 'GET',
    ...(options || {}),
  });
}

/** importCourseDataByExcel POST /api/excel/course/import */
export async function importCourseDataByExcelUsingPost(
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.BaseResponseMapStringObject_>('/api/excel/course/import', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** downloadLogPrintCertificate GET /api/excel/log/certificate/download */
export async function downloadLogPrintCertificateUsingGet(options?: { [key: string]: any }) {
  return request<any>('/api/excel/log/certificate/download', {
    method: 'GET',
    ...(options || {}),
  });
}

/** downloadUserCourseExample GET /api/excel/uer/course/download/example */
export async function downloadUserCourseExampleUsingGet(options?: { [key: string]: any }) {
  return request<any>('/api/excel/uer/course/download/example', {
    method: 'GET',
    ...(options || {}),
  });
}

/** downloadUserCertificate GET /api/excel/user/certificate/download */
export async function downloadUserCertificateUsingGet(options?: { [key: string]: any }) {
  return request<any>('/api/excel/user/certificate/download', {
    method: 'GET',
    ...(options || {}),
  });
}

/** downloadUserCourse GET /api/excel/user/course/download */
export async function downloadUserCourseUsingGet(options?: { [key: string]: any }) {
  return request<any>('/api/excel/user/course/download', {
    method: 'GET',
    ...(options || {}),
  });
}

/** importUserCourseDataByExcel POST /api/excel/user/course/import */
export async function importUserCourseDataByExcelUsingPost(
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.BaseResponseMapStringObject_>('/api/excel/user/course/import', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** downloadUser GET /api/excel/user/download */
export async function downloadUserUsingGet(options?: { [key: string]: any }) {
  return request<any>('/api/excel/user/download', {
    method: 'GET',
    ...(options || {}),
  });
}

/** downloadUserExample GET /api/excel/user/download/example */
export async function downloadUserExampleUsingGet(options?: { [key: string]: any }) {
  return request<any>('/api/excel/user/download/example', {
    method: 'GET',
    ...(options || {}),
  });
}

/** importUserDataByExcel POST /api/excel/user/import */
export async function importUserDataByExcelUsingPost(
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.BaseResponseMapStringObject_>('/api/excel/user/import', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
