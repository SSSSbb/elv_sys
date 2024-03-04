import { request } from 'umi';

import type {
  EnterpriseTableListItem,
  EnterpriseTableListItemResponse,
  EnterpriseTableListParams,
} from 'src/pages/rbac/enterprise/data';

export async function queryEnterprise(params?: EnterpriseTableListParams) {
  console.log({ params });
  return request<API.Response<EnterpriseTableListItemResponse>>(`/api/rbac/enterprise/index`, {
    method: 'GET',
    params,
  });
}
export async function addEnterprise(payload: EnterpriseTableListItem) {
  return request<API.Response<any>>(`/api/rbac/enterprise/create`, {
    method: 'POST',
    data: {
      ...payload,
    },
  });
}

export async function updateEnterprise(payload: EnterpriseTableListItem) {
  return request(`/api/rbac/enterprise/update`, {
    method: 'POST',
    data: {
      ...payload,
    },
  });
}
export async function getIndexById(id: number) {
  return request(`/api/rbac/enterprise/getIndexById`, {
    method: 'GET',
    params: {
      id,
    },
  });
}

export async function deleteEnterprise(id: number) {
  console.log({ id });
  return request(`/api/rbac/enterprise/delete`, {
    method: 'GET',
    params: {
      id,
    },
  });
}
