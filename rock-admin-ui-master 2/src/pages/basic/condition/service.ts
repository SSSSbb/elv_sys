import { request } from 'umi';

import type { TableListItem, TableListItemResponse, TableListParams } from './data';

export async function queryCondition(params?: TableListParams) {
  return request<API.Response<TableListItemResponse>>(`/api/basic/condition/index`, {
    method: 'GET',
    params,
  });
}
export async function addCondition(payload: TableListItem) {
  console.log({ payload });
  return request<API.Response<any>>(`/api/basic/condition/create`, {
    method: 'POST',
    data: {
      ...payload,
    },
  });
}

export async function updateCondition(payload: TableListItem) {
  console.log({ payload });
  return request(`/api/basic/condition/update`, {
    method: 'POST',
    data: {
      ...payload,
    },
  });
}

export async function deleteCondition(id: number) {
  return request(`/api/basic/condition/delete`, {
    method: 'GET',
    params: {
      id,
    },
  });
}
