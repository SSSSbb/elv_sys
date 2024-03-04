import { request } from 'umi';

import type { TableListItem, TableListItemResponse, TableListParams } from './data';

export async function queryMaintain(params?: TableListParams) {
  return request<API.Response<TableListItemResponse>>(`/api/basic/maintain/index`, {
    method: 'GET',
    params,
  });
}
export async function addMaintain(payload: TableListItem) {
  console.log({ payload });
  return request<API.Response<any>>(`/api/basic/maintain/create`, {
    method: 'POST',
    data: {
      ...payload,
    },
  });
}

export async function updateMaintain(payload: TableListItem) {
  console.log({ payload });
  return request(`/api/basic/maintain/update`, {
    method: 'POST',
    data: {
      ...payload,
    },
  });
}

export async function deleteMaintain(id: number) {
  return request(`/api/basic/maintain/delete`, {
    method: 'GET',
    params: {
      id,
    },
  });
}
