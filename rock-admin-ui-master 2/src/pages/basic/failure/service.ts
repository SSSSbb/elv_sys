import { request } from 'umi';

import type { TableListItem, TableListItemResponse, TableListParams } from './data';

export async function queryFailure(params?: TableListParams) {
  return request<API.Response<TableListItemResponse>>(`/api/basic/failure/index`, {
    method: 'GET',
    params,
  });
}
export async function addFailure(payload: TableListItem) {
  console.log({ payload });
  return request<API.Response<any>>(`/api/basic/failure/create`, {
    method: 'POST',
    data: {
      ...payload,
    },
  });
}

export async function updateFailure(payload: TableListItem) {
  console.log({ payload });
  return request(`/api/basic/failure/update`, {
    method: 'POST',
    data: {
      ...payload,
    },
  });
}

export async function deleteFailure(id: number) {
  return request(`/api/basic/failure/delete`, {
    method: 'GET',
    params: {
      id,
    },
  });
}
