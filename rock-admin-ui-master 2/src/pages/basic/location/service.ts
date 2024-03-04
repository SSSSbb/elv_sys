import { request } from 'umi';

import type { TableListItem, TableListItemResponse, TableListParams } from './data';

export async function queryLocation(params?: TableListParams) {
  return request<API.Response<TableListItemResponse>>(`/api/basic/location/index`, {
    method: 'GET',
    params,
  });
}
export async function addLocation(payload: TableListItem) {
  console.log({ payload });
  return request<API.Response<any>>(`/api/basic/location/create`, {
    method: 'POST',
    data: {
      ...payload,
    },
  });
}

export async function updateLocation(payload: TableListItem) {
  console.log({ payload });
  return request(`/api/basic/location/update`, {
    method: 'POST',
    data: {
      ...payload,
    },
  });
}

export async function deleteLocation(id: number) {
  return request(`/api/basic/location/delete`, {
    method: 'GET',
    params: {
      id,
    },
  });
}
