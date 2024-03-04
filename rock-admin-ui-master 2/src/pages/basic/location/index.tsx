import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, message, Space, Popconfirm } from 'antd';
import type { TableListItem } from './data';
import { PlusOutlined } from '@ant-design/icons';
import ProForm, { ModalForm, ProFormText } from '@ant-design/pro-form';
import { Access, useAccess } from '@@/plugin-access/access';
import { currentUser as queryCurrentUser } from '@/services/api';
import { addLocation, deleteLocation, queryLocation, updateLocation } from './service';
import { Map, Marker, NavigationControl, CityListControl } from 'react-bmapgl';
const RbacLocationList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [form] = ProForm.useForm<TableListItem>();
  const [longitude, setLongitude] = useState<number | undefined>(undefined);
  const [latitude, setLatitude] = useState<number | undefined>(undefined);
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [BMapVisible, handleBMaplVisible] = useState<boolean>(false);
  const access: API.UserAccessItem = useAccess();
  const [maker, setMarker] = useState(null);
  async function handleDeleteUser(id: number) {
    const response = await deleteLocation(id);
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
    },
    {
      title: 'longitude',
      dataIndex: 'longitude',
      search: false,
    },
    {
      title: 'latitude',
      dataIndex: 'latitude',
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
                setLongitude(record.longitude);
                setLatitude(record.latitude);
                handleBMaplVisible(true);
              }}
            >
              查看地点
            </a>
            <a
              type={'primary'}
              onClick={() => {
                form.setFieldsValue(record);
                setLongitude(record.longitude);
                setLatitude(record.latitude);
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
            const response = await queryLocation({ ...params, belongto: rsp.data?.belongto });
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
            width="600px"
            visible={createModalVisible}
            isKeyPressSubmit={true}
            onVisibleChange={handleCreateModalVisible}
            modalProps={{
              centered: true,
              bodyStyle: { height: 700 },
            }}
            onFinish={async (value) => {
              const rsp = await queryCurrentUser();
              value.belongto = rsp.data?.belongto;
              value.longitude = longitude;
              value.latitude = latitude;
              const response = await addLocation(value as TableListItem);
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
            <Map
              center={{ lng: 116.402544, lat: 39.928216 }}
              style={{ height: 500 }}
              zoom="12"
              enableScrollWheelZoom={true}
              onClick={async (e: any) => {
                setMarker(<Marker position={{ lng: e.latlng.lng, lat: e.latlng.lat }} />);
                console.log({ e });
                setLongitude(e.latlng.lng);
                setLatitude(e.latlng.lat);
                console.log({ longitude });
                console.log({ latitude });
              }}
            >
              <CityListControl />
              <Marker position={{ lng: longitude, lat: latitude }} enableDragging={true} />
            </Map>
          </ModalForm>
        )}
        {BMapVisible && (
          <ModalForm
            title="查看"
            width="700px"
            visible={BMapVisible}
            isKeyPressSubmit={true}
            submitter={false}
            onVisibleChange={handleBMaplVisible}
            modalProps={{
              centered: true,
            }}
            onFinish={async (value) => {}}
          >
            <Map center={{ lng: longitude, lat: latitude }} zoom="17" enableScrollWheelZoom={true}>
              <Marker position={{ lng: longitude, lat: latitude }} />
              <NavigationControl />
            </Map>
          </ModalForm>
        )}
        {updateModalVisible && (
          <ModalForm<TableListItem>
            title="编辑"
            width="1000px"
            form={form}
            isKeyPressSubmit={true}
            visible={updateModalVisible}
            onVisibleChange={handleUpdateModalVisible}
            modalProps={{
              centered: true,
              bodyStyle: { height: 700 },
            }}
            onFinish={async (value: TableListItem) => {
              const payload: TableListItem = {
                id: value.id,
                latitude: latitude,
                longitude: longitude,
                ...value,
              };
              console.log({ payload });
              const response = await updateLocation(payload);
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
            <Map
              center={{ lng: longitude, lat: latitude }}
              style={{ height: 500 }}
              zoom="17"
              enableScrollWheelZoom={true}
              onClick={async (e: any) => {
                setMarker(<Marker position={{ lng: e.latlng.lng, lat: e.latlng.lat }} />);
                console.log({ e });
                setLongitude(e.latlng.lng);
                setLatitude(e.latlng.lat);
                console.log({ longitude });
                console.log({ latitude });
              }}
            >
              <CityListControl />
              <Marker position={{ lng: longitude, lat: latitude }} enableDragging={true} />
            </Map>
          </ModalForm>
        )}
      </Access>
    </PageContainer>
  );
};
export default RbacLocationList;
