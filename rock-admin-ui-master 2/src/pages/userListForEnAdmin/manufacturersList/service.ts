import { request } from 'umi';

import type { TableListItem, TableListItemResponse, TableListParams } from './data';

export async function queryMan(params?: TableListParams) {
  console.log({ params });
  return request<API.Response<TableListItemResponse>>(`/api/manufacture/list/index`, {
    method: 'GET',
    params,
  });
}
export async function addMan(payload: TableListItem) {
  console.log({ payload });
  return request<API.Response<any>>(`/api/manufacture/list/create`, {
    method: 'POST',
    data: {
      ...payload,
    },
  });
}

export async function updateMan(payload: TableListItem) {
  console.log({ payload });
  return request(`/api/manufacture/list/update`, {
    method: 'POST',
    data: {
      ...payload,
    },
  });
}

export async function deleteMan(id: number) {
  return request(`/api/manufacture/list/delete`, {
    method: 'GET',
    params: {
      id,
    },
  });
}
