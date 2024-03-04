import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, message, Space, Form, Popconfirm, Switch } from 'antd';
import type { EnterpriseTableListItem } from '@/pages/rbac/enterprise/data';
import {
  queryEnterprise,
  addEnterprise,
  deleteEnterprise,
  updateEnterprise,
} from '@/pages/rbac/enterprise/service';
import { PlusOutlined } from '@ant-design/icons';
import ProForm, { DrawerForm, ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { Access, useAccess } from '@@/plugin-access/access';
import { TableListItem } from '../user/data';
import { queryUser, statusUser, updateUser } from '../user/service';
import { roleIndex } from '../role/service';

const RbacEnterpriseList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [updateUserModalVisible, handleUserUpdateModalVisible] = useState<boolean>(false);
  const [row, handleRow] = useState<Partial<EnterpriseTableListItem>>({});
  const access: API.UserAccessItem = useAccess();
  async function handleDeleteEnterprise(id: number) {
    const response = await deleteEnterprise(id);
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
  const columns_user: ProColumns<TableListItem>[] = [
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
      title: '所属公司',
      dataIndex: 'belongto',
      search: false,
      hideInTable: true,
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
        );
      },
    },
    {
      title: '创建时间',
      search: false,
      dataIndex: 'created_at',
    },
    {
      title: '更新时间',
      search: false,
      dataIndex: 'updated_at',
    },
    {
      title: '操作',
      hideInForm: true,
      search: false,
      render: (_, record) => {
        function handleDeleteUser(arg0: number): void {
          throw new Error('Function not implemented.');
        }
        return (
          <Space>
            <a
              type={'primary'}
              size={'small'}
              onClick={() => {
                Userform.setFieldsValue(record);
                console.log({ record });
                handleUserUpdateModalVisible(true);
              }}
            >
              编辑
            </a>

            <Popconfirm title={'确认删除？'} onConfirm={() => handleDeleteUser(record.id!)}>
              <a>删除</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const columns: ProColumns<EnterpriseTableListItem>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInTable: true,
      search: false,
    },
    {
      title: '公司名称',
      dataIndex: 'name',
    },
    {
      title: '负责人姓名',
      dataIndex: 'adminname',
      search: false,
    },
    {
      title: '备注',
      dataIndex: 'extrainfo',
      search: false,
    },
    {
      title: '创建时间',
      search: false,
      dataIndex: 'created_at',
    },
    {
      title: '操作',
      hideInForm: true,
      search: false,
      render: (_, record) => {
        return (
          <Space>
            <Access accessible={access.rbacEnterpriseUpdate!}>
              <a
                type={'primary'}
                size={'small'}
                onClick={() => {
                  handleRow(record);
                  console.log({ record });
                  handleUpdateModalVisible(true);
                }}
              >
                编辑
              </a>
            </Access>
            <DrawerForm
              title="查看"
              width="auto"
              key={'_lookup_form_' + record.id}
              submitter={false}
              trigger={
                <a type="primary" onClick={() => {}}>
                  查看成员
                </a>
              }
            >
              <ProTable
                columns={columns_user}
                actionRef={actionRef}
                cardBordered
                request={async (params = {}) => {
                  const response = await queryUser({ ...params, belongto: record.id });
                  console.log({ response });
                  return {
                    success: response.code === 200,
                    data: response!.data!.list,
                    page: response!.data!.page_num,
                    total: response!.data!.total,
                  };
                }}
                editable={{
                  type: 'multiple',
                }}
                columnsState={{
                  persistenceKey: 'pro-table-singe-demos',
                  persistenceType: 'localStorage',
                  defaultValue: {
                    option: { fixed: 'right', disable: true },
                  },
                  onChange(value) {},
                }}
                onSubmit={(params) => {
                  queryUser({ ...params, belongto: record.id });
                }}
                search={{
                  labelWidth: 'auto',
                  defaultCollapsed: false,
                }}
                rowKey="id"
                options={{
                  setting: {
                    listsHeight: 400,
                  },
                }}
                // expandable={{
                //   expandedRowRender: (record) => (
                //     <>
                //       <br />
                //       <p style={{ whiteSpace: 'pre-wrap' }}>{record.id}</p>
                //     </>
                //   ),
                //   rowExpandable: (record) => !!record.extrainfo,
                // }}
                pagination={{}}
                toolBarRender={() => []}
                dateFormatter="string"
              />
            </DrawerForm>
            <Access accessible={access.rbacEnterpriseDelete!}>
              <Popconfirm title={'确认删除？'} onConfirm={() => handleDeleteEnterprise(record.id!)}>
                <a>删除</a>
              </Popconfirm>
            </Access>
          </Space>
        );
      },
    },
  ];
  const [Userform] = ProForm.useForm<TableListItem>();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ ...row });
  }, []);
  return (
    <PageContainer>
      <ProTable
        headerTitle={'公司列表'}
        actionRef={actionRef}
        rowKey="id"
        onSubmit={(params) => queryEnterprise(params)}
        search={{
          labelWidth: 'auto',
          span: 7,
          defaultCollapsed: false,
        }}
        columns={columns}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleCreateModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params = {}) => {
          console.log('Access Info:', access);
          const response = await queryEnterprise(params);
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
          title="添加"
          width="450px"
          isKeyPressSubmit={true}
          visible={createModalVisible}
          onVisibleChange={handleCreateModalVisible}
          modalProps={{
            centered: true,
          }}
          onFinish={async (value) => {
            console.log({ value });
            const response = await addEnterprise(value as EnterpriseTableListItem);
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
            name={'name'}
            label={'用户公司名称'}
            placeholder={'请输入用户公司名称'}
            rules={[
              {
                required: true,
                message: '请输入用户公司名称',
              },
            ]}
          />
          <ProFormText
            name={'adminname'}
            label={'负责人姓名'}
            placeholder={'请输入负责人姓名'}
            rules={[
              {
                required: true,
                message: '请输入负责人姓名',
              },
            ]}
          />
          <ProFormText
            name={'extrainfo'}
            label={'备注'}
            placeholder={'请输入备注'}
            rules={[
              {
                message: '请输入备注',
              },
            ]}
          />
        </ModalForm>
      )}
      {updateModalVisible && (
        <ModalForm
          title="编辑公司"
          isKeyPressSubmit={true}
          width="450px"
          visible={updateModalVisible}
          onVisibleChange={handleUpdateModalVisible}
          modalProps={{
            centered: true,
          }}
          onFinish={async (value: EnterpriseTableListItem) => {
            const payload: EnterpriseTableListItem = {
              id: row!.id!,
              ...value,
            };
            const response = await updateEnterprise(payload);
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
            initialValue={row.name}
            name={'name'}
            label={'公司名称'}
            placeholder={'请输入公司名称'}
            rules={[
              {
                required: true,
                message: '请输入公司名称',
              },
            ]}
          />
          <ProFormText
            initialValue={row.adminname}
            name={'adminname'}
            label={'负责人姓名'}
            placeholder={'请输入负责人姓名'}
            rules={[
              {
                required: true,
                message: '请输入负责人姓名',
              },
            ]}
          />
          <ProFormText initialValue={row.extrainfo} name={'extrainfo'} label={'备注'} />
        </ModalForm>
      )}

      {updateUserModalVisible && (
        <ModalForm
          title="编辑用户"
          width="450px"
          form={Userform}
          isKeyPressSubmit={true}
          visible={updateUserModalVisible}
          onVisibleChange={handleUserUpdateModalVisible}
          modalProps={{
            centered: true,
          }}
          onFinish={async (value: TableListItem) => {
            const payload: TableListItem = {
              id: value.id,
              ...value,
            };
            console.log({ payload });
            const response = await updateUser(payload);
            const { code, msg } = response;
            if (code !== 200) {
              message.error(msg);
              return;
            }
            message.success(msg);
            handleUserUpdateModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
        >
          <ProFormText name="id" label={'用户ID'} hidden />
          <ProFormText
            name="username"
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
            placeholder={'请输入登录密码,不修改不用输入'}
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
        </ModalForm>
      )}
    </PageContainer>
  );
};
export default RbacEnterpriseList;
