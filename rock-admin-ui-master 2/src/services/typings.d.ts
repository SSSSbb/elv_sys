declare namespace API {
  interface Response<T> {
    code: number;
    msg: string;
    data?: T;
  }
  type CurrentUser = {
    id: number;
    username?: string;
    avatar?: string;
    mobile: string;
    access?: UserAccessItem;
  };
  type LoginParams = {
    username?: string;
    password?: string;
  };
  type LoginResult = {
    code?: number;
    msg?: string;
    data?: {
      token?: string;
      url?: string;
    };
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };
  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type UserAccessItem = {
    rbacRoleCreate?: boolean;
    rbacRoleIndex?: boolean;
    rbacUserDelete?: boolean;
    rbacPermissionCreate?: boolean;
    rbacUserUpdate?: boolean;
    rbacEnterpriseUpdate?: boolean;
    rbacRolePermissionIndex?: boolean;
    rbacUserIndex?: boolean;
    rbacEnterpriseIndex?: boolean;
    rbacEnterpriseCreate?: boolean;
    rbacEnterpriseDelete?: boolean;
    rbacUserStatus?: boolean;
    rbacRoleUpdate?: boolean;
    rbacUserCreate?: boolean;
    rbacPermissionUpdate?: boolean;
    rbacPermissionDelete?: boolean;
    rbac?: boolean;
    basic?: boolean;
    rbacPermissionIndex?: boolean;
    rbacRoleDelete?: boolean;
    rbacRoleAuthPermission?: boolean;
    userlistforenadmin?: boolean;
    userlistforenadminUserIndex?: boolean;
    manufactureListCreate?: boolean;
    manufactureListIndex?: boolean;
    supListIndex?: boolean;
    supListCreate?: boolean;
    basicTypeIndex?: boolean;
  };
}
