import { request } from 'umi';

import type { TableListItem, TableListItemResponse, TableListParams } from 'src/pages/profile/data';

export async function queryProfile(params?: TableListParams) {
  console.log({ params });
  return request<API.Response<TableListItemResponse>>(`/api/profile/index`, {
    method: 'GET',
    params,
  });
}
export async function addProfile(payload: TableListItem) {
  return request<API.Response<any>>(`/api/profile/create`, {
    method: 'POST',
    data: {
      ...payload,
    },
  });
}

export async function updateProfile(payload: TableListItem) {
  console.log({ payload });
  return request(`/api/profile/update`, {
    method: 'POST',
    data: {
      ...payload,
    },
  });
}
export async function getProfile(id: number) {
  return request(`/api/rbac/enterprise/getIndexById`, {
    method: 'GET',
    params: {
      id,
    },
  });
}

export async function deleteProfile(id: number) {
  console.log({ id });
  return request(`/api/profile/delete`, {
    method: 'GET',
    params: {
      id,
    },
  });
}
