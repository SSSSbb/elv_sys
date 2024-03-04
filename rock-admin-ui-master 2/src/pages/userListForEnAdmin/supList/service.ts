import { request } from 'umi';

import type { TableListItem, TableListItemResponse, TableListParams } from './data';

export async function querySup(params?: TableListParams) {
  return request<API.Response<TableListItemResponse>>(`/api/sup/list/index`, {
    method: 'GET',
    params,
  });
}
export async function addSup(payload: TableListItem) {
  console.log({ payload });
  return request<API.Response<any>>(`/api/sup/list/create`, {
    method: 'POST',
    data: {
      ...payload,
    },
  });
}

export async function updateSup(payload: TableListItem) {
  console.log({ payload });
  return request(`/api/sup/list/update`, {
    method: 'POST',
    data: {
      ...payload,
    },
  });
}

export async function deleteSup(id: number) {
  return request(`/api/sup/list/delete`, {
    method: 'GET',
    params: {
      id,
    },
  });
}
