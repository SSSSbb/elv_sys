import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, message, Space, Popconfirm } from 'antd';
import type { TableListItem } from './data';
import { PlusOutlined } from '@ant-design/icons';
import ProForm, { ModalForm, ProFormText } from '@ant-design/pro-form';
import { Access, useAccess } from '@@/plugin-access/access';

import { currentUser as queryCurrentUser } from '@/services/api';
import { addFailure, deleteFailure, queryFailure, updateFailure } from './service';

const RbacTypeList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [form] = ProForm.useForm<TableListItem>();
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const access: API.UserAccessItem = useAccess();
  async function handleDeleteUser(id: number) {
    console.log({ id });
    const response = await deleteFailure(id);
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
      title: '标题',
      dataIndex: 'name',
      search: false,
    },
    {
      title: '故障类别',
      dataIndex: 'type',
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
      <Access accessible={access.basicTypeIndex!}>
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
            const response = await queryFailure({ ...params, belongto: rsp.data?.belongto });
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
            visible={createModalVisible}
            isKeyPressSubmit={true}
            onVisibleChange={handleCreateModalVisible}
            modalProps={{
              centered: true,
            }}
            onFinish={async (value) => {
              const rsp = await queryCurrentUser();
              value.belongto = rsp.data?.belongto;
              const response = await addFailure(value as TableListItem);
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
              label={'标题'}
              placeholder={'请输入标题'}
              rules={[
                {
                  required: true,
                  message: '请输入标题',
                },
              ]}
            />
            <ProFormText
              name={'type'}
              label={'故障类别'}
              placeholder={'请输入故障类别'}
              rules={[
                {
                  required: true,
                  message: '请输入故障类别',
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
              const response = await updateFailure(payload);
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
              label={'标题'}
              placeholder={'请输入标题'}
              rules={[
                {
                  required: true,
                  message: '请输入标题',
                },
              ]}
            />
            <ProFormText
              name="type"
              label={'故障类别'}
              placeholder={'请输入故障类别'}
              rules={[
                {
                  required: true,
                  message: '请输入故障类别',
                },
              ]}
            />
          </ModalForm>
        )}
      </Access>
    </PageContainer>
  );
};
export default RbacTypeList;
