import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, message, Modal, Space, Switch, Form, Popconfirm } from 'antd';
import type { TableListItem } from '@/pages/rbac/user/data';
import { addUser, deleteUser, queryUser, statusUser, updateUser } from '@/pages/rbac/user/service';
import { PlusOutlined } from '@ant-design/icons';
import { DrawerForm, ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { roleIndex } from '@/pages/rbac/role/service';
import { Access, useAccess } from '@@/plugin-access/access';

import { getIndexById, queryEnterprise } from '@/pages/rbac/enterprise/service';

const RbacUserList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [belongToData, setBelongToData] = useState<Record<number, string>>({});
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [row, handleRow] = useState<Partial<TableListItem>>({});
  const access: API.UserAccessItem = useAccess();
  async function handleDeleteUser(id: number) {
    const response = await deleteUser(id);
    const { code, msg } = response;
    if (code !== 200) {
      message.error(msg);
      return;
    }
    message.success(msg);
    if (actionRef.current) {
      actionRef.current?.reload();
    }
  }
  useEffect(() => {
    const fetchBelongToData = async () => {
      const users = await queryUser();
      const belongToMap = {};
      for (const user of users.data?.list || []) {
        const enterprise = await getIndexById(user.belongto);
        console.log({ user });
        belongToMap[user.belongto] = enterprise.name;
      }
      console.log({ belongToMap });

      setBelongToData(belongToMap);
    };

    fetchBelongToData();
  }, []);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInTable: true,
      search: false,
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '角色',
      search: false,
      renderText: (text, record) => {
        return record.role?.name;
      },
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '所属公司',
      dataIndex: 'belongto',
      search: false,
      render: (_, record) => belongToData[record.belongto],
    },
    {
      title: '账号状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        0: {
          text: '全部',
          status: 'Success',
        },
        1: {
          text: '正常',
          status: 'Success',
        },
        2: {
          text: '禁用',
          status: 'Processing',
        },
      },
      render: (dom, record) => {
        return (
          <Access
            accessible={access.rbacUserStatus!}
            fallback={() => {
              return dom;
            }}
          >
            <Switch
              defaultChecked={record.status === 1}
              checkedChildren={'正常'}
              unCheckedChildren={'冻结'}
              onChange={async (checked) => {
                const status = checked ? 1 : 2;
                const response = await statusUser({ id: record.id!, status });
                const { code, msg } = response;
                if (code === 200) {
                  message.success(msg);
                  return;
                }
                message.error(msg);
              }}
            />
          </Access>
        );
      },
    },
    {
      title: '创建时间',
      search: false,
      hideInForm: true,
      dataIndex: 'created_at',
    },
    {
      title: '操作',
      hideInForm: true,
      search: false,
      render: (_, record) => {
        return (
          <Space>
            <Access accessible={access.rbacUserUpdate!}>
              <a
                type={'primary'}
                size={'small'}
                onClick={() => {
                  handleRow(record);
                  handleUpdateModalVisible(true);
                }}
              >
                编辑
              </a>
            </Access>
            <Access accessible={access.rbacUserDelete!}>
              <Popconfirm title={'确认删除？'} onConfirm={() => handleDeleteUser(record.id!)}>
                <a>删除</a>
              </Popconfirm>
            </Access>
          </Space>
        );
      },
    },
  ];
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ ...row });
  }, []);
  return (
    <PageContainer>
      <ProTable
        headerTitle={'用户列表'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        columns={columns}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleCreateModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params = {}) => {
          const response = await queryUser(params);
          console.log({ response });
          return {
            success: response.code === 200,
            data: response!.data!.list,
            page: response!.data!.page_num,
            total: response!.data!.total,
          };
        }}
      />
      {createModalVisible && (
        <ModalForm
          title="添加用户"
          width="450px"
          visible={createModalVisible}
          isKeyPressSubmit={true}
          onVisibleChange={handleCreateModalVisible}
          modalProps={{
            centered: true,
          }}
          onFinish={async (value) => {
            const response = await addUser(value as TableListItem);
            const { code, msg } = response;
            if (code !== 200) {
              message.error(msg);
              return;
            }
            message.success(msg);
            handleCreateModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
        >
          <ProFormText
            name={'username'}
            label={'用户名'}
            placeholder={'请输入用户名'}
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          />
          <ProFormText
            name={'mobile'}
            label={'手机号'}
            placeholder={'请输入手机号'}
            rules={[
              {
                required: true,
                message: '请输入手机号',
              },
            ]}
          />
          <ProFormText.Password
            name={'password'}
            label={'登录密码'}
            placeholder={'请输入登录密码'}
            rules={[
              {
                required: true,
                message: '请输入登录密码',
              },
            ]}
          />
          <ProFormSelect
            name={'role_id'}
            label={'用户角色'}
            placeholder={'请选择用户角色'}
            rules={[
              {
                required: true,
                message: '请选择用户角色',
              },
            ]}
            request={async () => {
              const response = await roleIndex({});
              return response.data!.map((item) => {
                return {
                  label: item.name,
                  value: item.id,
                };
              });
            }}
          />
          <ProFormSelect
            name={'belongto'}
            label={'所属公司'}
            placeholder={'请选择所属公司'}
            rules={[
              {
                required: true,
                message: '请选择用户角色',
              },
            ]}
            request={async () => {
              const response = await queryEnterprise({});
              return response.data!.list.map((item) => {
                return {
                  label: item.name,
                  value: item.id,
                };
              });
            }}
          />
        </ModalForm>
      )}
      {updateModalVisible && (
        <ModalForm
          title="编辑用户"
          width="450px"
          isKeyPressSubmit={true}
          visible={updateModalVisible}
          onVisibleChange={handleUpdateModalVisible}
          modalProps={{
            centered: true,
          }}
          onFinish={async (value: TableListItem) => {
            const payload: TableListItem = {
              id: row!.id!,
              ...value,
            };
            const response = await updateUser(payload);
            const { code, msg } = response;
            if (code !== 200) {
              message.error(msg);
              return;
            }
            message.success(msg);
            handleUpdateModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
        >
          <ProFormText
            initialValue={row.username}
            name={'username'}
            label={'用户名'}
            placeholder={'请输入用户名'}
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          />
          <ProFormText
            initialValue={row.mobile}
            name={'mobile'}
            label={'手机号'}
            placeholder={'请输入手机号'}
            rules={[
              {
                required: true,
                message: '请输入手机号',
              },
            ]}
          />
          <ProFormText.Password
            name={'password'}
            label={'登录密码'}
            placeholder={'请输入登录密码,不修改不用输入'}
          />
          <ProFormSelect
            initialValue={row.role_id}
            name={'role_id'}
            label={'用户角色'}
            placeholder={'请选择用户角色'}
            rules={[
              {
                required: true,
                message: '请选择用户角色',
              },
            ]}
            request={async () => {
              const response = await roleIndex({});
              return response.data!.map((item) => {
                return {
                  label: item.name,
                  value: item.id,
                };
              });
            }}
          />
        </ModalForm>
      )}
    </PageContainer>
  );
};
export default RbacUserList;
