export type TableListItem = {
  id: number;
  name: string;
  status: string;
  type: string;
  location: string;
  spec: string;
  device_code: string;
  maintain: number;
  repair: number;
  user: string;
  man: string;
  sup: string;
  buy_at?: string;
  start_at?: string;
  last_maintain?: string;
  last_repair?: string;
  maintaintype: string;
  doc: Blob;
  pic?: Blob;
  reg_code: number;
  belongto?: number;
  created_at?: string;
  updated_at?: string;
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
  name?: string;
  status?: string;
  location?: string;
  spec?: string;
  device_code?: string;
  type: string;
  maintain?: number;
  repair?: number;
  user?: string;
  man?: string;
  sup?: string;
  buy_at?: string;
  start_at?: string;
  last_maintain?: string;
  last_repair?: string;
  maintaintype?: string;
  reg_code: number;
  belongto?: number;
  created_at?: string;
  updated_at?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
