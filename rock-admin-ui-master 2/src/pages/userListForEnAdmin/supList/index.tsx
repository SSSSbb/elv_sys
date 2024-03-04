import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, message, Modal, Space, Switch, Form, Popconfirm } from 'antd';
import type { TableListItem } from '@/pages/userListForEnAdmin/supList/data';
import { addSup, deleteSup, querySup, updateSup } from '@/pages/userListForEnAdmin/supList/service';
import { PlusOutlined } from '@ant-design/icons';
import ProForm, { DrawerForm, ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { Access, useAccess } from '@@/plugin-access/access';

import { currentUser as queryCurrentUser } from '@/services/api';

const RbacSupList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [form] = ProForm.useForm<TableListItem>();
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const access: API.UserAccessItem = useAccess();
  async function handleDeleteUser(id: number) {
    console.log({ id });
    const response = await deleteSup(id);
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

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInTable: true,
      search: false,
    },
    {
      title: '供货商名称',
      dataIndex: 'name',
    },
    {
      title: '负责人姓名',
      dataIndex: 'adminname',
    },
    {
      title: '负责人电话',
      dataIndex: 'adminphone',
    },
    {
      title: '资质',
      dataIndex: 'qualification',
      search: false,
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
            <a
              type={'primary'}
              onClick={() => {
                form.setFieldsValue(record);
                handleUpdateModalVisible(true);
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
  return (
    <PageContainer>
      <Access accessible={access.supListIndex!}>
        <ProTable
          actionRef={actionRef}
          rowKey="id"
          search={{
            labelWidth: 120,
          }}
          columns={columns}
          toolBarRender={() => [
            <Access accessible={access.supListCreate!}>
              <Button type="primary" onClick={() => handleCreateModalVisible(true)}>
                <PlusOutlined /> 新建
              </Button>
            </Access>,
          ]}
          request={async (params = {}) => {
            const rsp = await queryCurrentUser();
            console.log({ rsp });
            const response = await querySup({ ...params, belongto: rsp.data?.belongto });
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
            visible={createModalVisible}
            isKeyPressSubmit={true}
            onVisibleChange={handleCreateModalVisible}
            modalProps={{
              centered: true,
            }}
            onFinish={async (value) => {
              const rsp = await queryCurrentUser();
              value.belongto = rsp.data?.belongto;
              const response = await addSup(value as TableListItem);
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
              label={'供货商名称'}
              placeholder={'请输入名称'}
              rules={[
                {
                  required: true,
                  message: '请输入供货商名称',
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
              name={'adminphone'}
              label={'负责人电话'}
              placeholder={'请输入负责人电话'}
              rules={[
                {
                  required: true,
                  message: '请输入负责人电话',
                },
              ]}
            />
            <ProFormText
              name={'qualification'}
              label={'资质'}
              rules={[
                {
                  required: true,
                  message: '资质',
                },
              ]}
            />
          </ModalForm>
        )}
        {updateModalVisible && (
          <ModalForm<TableListItem>
            title="编辑"
            width="450px"
            form={form}
            isKeyPressSubmit={true}
            visible={updateModalVisible}
            onVisibleChange={handleUpdateModalVisible}
            modalProps={{
              centered: true,
            }}
            onFinish={async (value: TableListItem) => {
              const payload: TableListItem = {
                id: value.id,
                ...value,
              };
              const response = await updateSup(payload);
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
            <ProFormText name={'id'} label={'ID'} hidden />
            <ProFormText name={'belongto'} label={'belongto'} hidden />

            <ProFormText
              name="name"
              label={'生产厂家名称'}
              placeholder={'请输入名称'}
              rules={[
                {
                  required: true,
                  message: '请输入生产厂家名称',
                },
              ]}
            />
            <ProFormText
              name="adminname"
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
              name="adminphone"
              label={'负责人电话'}
              placeholder={'请输入负责人电话'}
              rules={[
                {
                  required: true,
                  message: '请输入负责人电话',
                },
              ]}
            />
            <ProFormText
              name="qualification"
              label={'资质'}
              rules={[
                {
                  required: true,
                  message: '资质',
                },
              ]}
            />
          </ModalForm>
        )}
      </Access>
    </PageContainer>
  );
};
export default RbacSupList;
