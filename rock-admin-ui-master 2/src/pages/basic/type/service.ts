import { request } from 'umi';

import type { TableListItem, TableListItemResponse, TableListParams } from './data';

export async function queryType(params?: TableListParams) {
  return request<API.Response<TableListItemResponse>>(`/api/basic/type/index`, {
    method: 'GET',
    params,
  });
}
export async function addType(payload: TableListItem) {
  console.log({ payload });
  return request<API.Response<any>>(`/api/basic/type/create`, {
    method: 'POST',
    data: {
      ...payload,
    },
  });
}

export async function updateType(payload: TableListItem) {
  console.log({ payload });
  return request(`/api/basic/type/update`, {
    method: 'POST',
    data: {
      ...payload,
    },
  });
}

export async function deleteType(id: number) {
  return request(`/api/basic/type/delete`, {
    method: 'GET',
    params: {
      id,
    },
  });
}
