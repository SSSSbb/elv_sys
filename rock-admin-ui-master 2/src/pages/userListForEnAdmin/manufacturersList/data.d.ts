export type TableListItem = {
  id?: number;
  name: string;
  adminname: string;
  adminphone: string;
  qualification?: string;
  created_at?: string;
  updated_at?: string;
  belongto?: number;
};

export type TableListItemResponse = {
  list: TableListItem[];
  page_num: number;
  page_size: number;
  total: number;
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  id?: number;
  name: string;
  adminname: string;
  adminphone: string;
  belongto: number;
  qualification?: string;
  created_at?: string;
  updated_at?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
