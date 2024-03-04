export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    access: 'Main',
    path: '/main',
    routes: [
      {
        // access: 'rbacRoleIndex',
        path: '/main/charts/index',
        component: './main/charts/index',
      },
    ],
  },
  {
    access: 'Rbac',
    path: '/rbac',
    routes: [
      {
        access: 'rbacRoleIndex',
        path: '/rbac/role/index',
        component: './rbac/role/index',
      },
      {
        access: 'rbacRolePermissionIndex',
        path: '/rbac/role/permission/index',
        component: './rbac/role/permission/index',
      },
      {
        access: 'rbacPermissionIndex',
        path: '/rbac/permission/index',
        component: './rbac/permission/index',
      },
      {
        access: 'rbacUserIndex',
        path: '/rbac/user/index',
        component: './rbac/user/index',
      },
      {
        access: 'rbacEnterpriseIndex',
        path: '/rbac/enterprise/index',
        component: './rbac/enterprise/index',
      },
    ],
  },
  {
    access: 'userlistforenadmin',
    path: '/userListForEnAdmin',
    routes: [
      {
        access: 'userlistforenadminUserIndex',
        path: '/userListForEnAdmin/user/index',
        component: './userListForEnAdmin/user/index',
      },
      {
        access: 'manufactureListIndex',
        path: '/userListForEnAdmin/manufacturersList/index',
        component: './userListForEnAdmin/manufacturersList/index',
      },
      {
        access: 'manufactureListIndex',
        path: '/userListForEnAdmin/supList/index',
        component: './userListForEnAdmin/supList/index',
      },
    ],
  },
  {
    access: 'basic',
    path: '/basic',
    routes: [
      {
        access: 'basicTypeIndex',
        path: '/basic/type/index',
        component: './basic/type/index',
      },
      {
        access: 'basicMaintainIndex',
        path: '/basic/maintain/index',
        component: './basic/maintain/index',
      },
      {
        access: 'basicConditionIndex',
        path: '/basic/condition/index',
        component: './basic/condition/index',
      },
      {
        access: 'basicLocationIndex',
        path: '/basic/location/index',
        component: './basic/location/index',
      },
      {
        access: 'basicFailureIndex',
        path: '/basic/failure/index',
        component: './basic/failure/index',
      },
    ],
  },
  {
    access: 'profile',
    path: '/profile',
    routes: [
      {
        access: 'profileIndex',
        path: '/profile/index',
        component: './profile/index',
      },
    ],
  },
  {
    access: 'ChatRoom',
    path: '/chat',
    routes: [
      {
        access: 'chatIndex',
        path: '/chat/index',
        component: './chat/index',
      },
    ],
  },
  {
    access: 'Account',
    path: '/account',
    routes: [
      {
        access: 'accountCenter',
        path: '/account/center',
        component: './account/center',
      },
    ],
  },
  {
    access: 'index',
    path: '/',
    redirect: '/rbac/user/index',
  },
  {
    component: './404',
  },
];
