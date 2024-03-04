export type EnterpriseTableListItem = {
  id?: number;
  name: string;
  adminname: string;
  extrainfo?: string;
  created_at?: string;
  updated_at?: string;
};

export type EnterpriseTableListItemResponse = {
  list: EnterpriseTableListItem[];
  page_num: number;
  page_size: number;
  total: number;
};

export type EnterpriseTableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type EnterpriseTableListData = {
  list: EnterpriseTableListItem[];
  pagination: Partial<EnterpriseTableListPagination>;
};

export type EnterpriseTableListParams = {
  id?: number;
  name?: string;
  extrainfo?: string;
  adminname?: string;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
