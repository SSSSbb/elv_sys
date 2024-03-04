import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import {
  Button,
  message,
  Space,
  Form,
  Popconfirm,
  Switch,
  Upload,
  Modal,
  UploadFile,
  Card,
  Table,
} from 'antd';

import { currentUser as queryCurrentUser } from '@/services/api';

import { CloseOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import ProForm, {
  DrawerForm,
  ModalForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { Access, useAccess } from '@@/plugin-access/access';
import { TableListItem } from './data';
import { addProfile, deleteProfile, queryProfile, updateProfile } from './service';
import { queryCondition } from '../basic/condition/service';
import { queryLocation } from '../basic/location/service';
import { queryUser } from '../rbac/user/service';
import { queryMan } from '../userListForEnAdmin/manufacturersList/service';
import { querySup } from '../userListForEnAdmin/supList/service';
import { queryMaintain } from '../basic/maintain/service';
import { queryType } from '../basic/type/service';
import { Map, Marker, NavigationControl, CityListControl } from 'react-bmapgl';

const RbacEnterpriseList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [belongto, setBelongto] = useState<any>();
  const [id, setId] = useState<any>();
  const [sup, setSup] = useState<any>();
  const [man, setMan] = useState<any>();
  const [longitude, setLongitude] = useState<number | undefined>(undefined);
  const [latitude, setLatitude] = useState<number | undefined>(undefined);
  const [blob, setBlob] = useState<any>();
  const [fileBlob, setFileBlob] = useState<any>();
  const [picUrl, setPicUrl] = useState<any>();
  const [detailsModalVisible, handleDetailsModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [row, handleRow] = useState<Partial<TableListItem>>({});
  const access: API.UserAccessItem = useAccess();
  async function handleDelete(id: number) {
    const response = await deleteProfile(id);
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
  const compressImage = (base64WithoutPrefix: string, compressionQuality: number) => {
    return new Promise<string>((resolve, reject) => {
      const image = new Image();
      image.src = `data:image/png;base64,${base64WithoutPrefix}`;

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;

        canvas.width = image.width * 0.5;
        canvas.height = image.height * 0.5;

        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        const compressedBase64 = canvas.toDataURL('image/jpeg', compressionQuality);

        const matchResult = compressedBase64.match(/^data:image\/\w+;base64,(.*)$/);

        if (matchResult && matchResult.length === 2) {
          resolve(matchResult[1]);
        } else {
          reject(new Error('Failed to extract image data from base64 string.'));
        }
      };

      image.onerror = (error) => {
        reject(error);
      };
    });
  };

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewFileVisible, setPreviewFileVisible] = useState(false);
  const handleUpload = async (file: any) => {
    try {
      const base64File = await getBase64(file.originFileObj);

      setFileBlob(base64File);
      console.log({ base64File });

      message.success(`${file.name} 上传成功`);
    } catch (error) {
      message.error(`${file.name} 上传失败.`);
    }
  };
  const getBase64 = (file: Blob | undefined) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64WithoutPrefix = reader.result?.split(',')[1]; // Remove 'data:text/plain;base64,'
        resolve(base64WithoutPrefix);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handlePreview = () => {
    setPreviewVisible(true);
  };
  function fileToBase64(file: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function beforeUpload(file: any) {
    const blob1 = await fileToBase64(file);
    const compressionQuality = 0.5;

    // 调用压缩方法
    const blob = await compressImage(blob1, compressionQuality);

    setBlob(blob);
    console.log({ blob });
    setPicUrl(`data:image/png;base64,${blob1}`);
  }
  const columns_user: ProColumns[] = [
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
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '创建时间',
      search: false,
      hideInForm: true,
      dataIndex: 'created_at',
    },
  ];
  const columns_sup: ProColumns[] = [
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
      title: '创建时间',
      search: false,
      hideInForm: true,
      dataIndex: 'created_at',
    },
  ];
  const columns_man: ProColumns[] = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInTable: true,
      search: false,
    },
    {
      title: '生产厂家名',
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
  ];
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '运行状态',
      dataIndex: 'status',
    },
    {
      title: 'ID',
      hideInTable: true,
      dataIndex: 'id',
      search: false,
    },
    {
      title: '标题',
      dataIndex: 'name',
    },
    {
      title: '电梯类型',
      dataIndex: 'type',
      search: false,
    },
    {
      title: '安装地点',
      dataIndex: 'location',
    },
    {
      title: '规格型号',
      dataIndex: 'spec',
      search: false,
    },
    {
      title: '设备代码',
      dataIndex: 'device_code',
    },
    {
      title: 'repair',
      dataIndex: 'repair',
      hideInTable: true,
      search: false,
    },
    {
      title: 'maintain',
      dataIndex: 'maintain',
      hideInTable: true,
      search: false,
    },
    {
      title: '负责人',
      dataIndex: 'user',
    },
    {
      title: '生产厂家',
      dataIndex: 'man',
    },
    {
      title: '供货商',
      dataIndex: 'sup',
    },
    {
      title: '注册代码',
      dataIndex: 'reg_code',
    },
    {
      title: '创建时间',
      search: false,
      hideInTable: true,
      dataIndex: 'created_at',
    },
    {
      title: '更新时间',
      search: false,
      hideInTable: true,
      dataIndex: 'updated_at',
    },
    {
      title: '购买时间',
      search: false,
      hideInTable: true,
      dataIndex: 'buy_at',
    },
    {
      title: '启动时间',
      search: false,
      hideInTable: true,
      dataIndex: 'start_at',
    },
    {
      title: '上次维保时间',
      search: false,
      hideInTable: true,
      dataIndex: 'last_maintain',
    },
    {
      title: '上次维修时间',
      search: false,
      hideInTable: true,
      dataIndex: 'last_repair',
    },
    {
      title: '操作',
      hideInForm: true,
      search: false,
      render: (_, record) => {
        return (
          <Space>
            <DrawerForm
              title="查看"
              key={'_lookup_form_' + record.id}
              submitter={false}
              trigger={
                <a
                  type="primary"
                  onClick={async () => {
                    console.log({ record });
                    setBlob({ blob: record.pic });
                    console.log({ blob });
                    setSup(record.sup);
                    setMan(record.man);
                    const response = await queryLocation({
                      belongto: belongto,
                      name: record.location,
                    });
                    const latitude = response!.data!.list[0].latitude;
                    const longitude = response!.data!.list[0].longitude;
                    setLatitude(latitude);
                    setLongitude(longitude);
                    console.log({ longitude });
                    if (record.pic) setPicUrl(`data:image/png;base64,${record.pic}`);
                    else setPicUrl(null);
                    setFileBlob(record.doc);
                    handleDetailsModalVisible(true);
                  }}
                >
                  查看
                </a>
              }
              form={form}
              autoFocusFirstInput
            >
              {' '}
              <Card title="安装地点">
                <Map
                  center={{ lng: longitude, lat: latitude }}
                  zoom="17"
                  enableScrollWheelZoom={true}
                >
                  <Marker position={{ lng: longitude, lat: latitude }} />
                  <NavigationControl />
                </Map>
              </Card>
              <Card title="电梯详细信息">
                <Table
                  style={{ width: '100%' }}
                  bordered
                  size="small"
                  pagination={false}
                  dataSource={[record]}
                >
                  <Table.Column title="ID" dataIndex="id" key="id" width={200} />
                  <Table.Column title="名称" dataIndex="name" key="name" width={200} />
                  <Table.Column title="运行状态" dataIndex="status" key="status" width={200} />
                  <Table.Column title="电梯类型" dataIndex="type" key="type" width={200} />
                </Table>
                <Table
                  style={{ width: '100%' }}
                  bordered
                  size="small"
                  pagination={false}
                  dataSource={[record]}
                >
                  <Table.Column title="规格型号" dataIndex="spec" key="spec" width={200} />
                  <Table.Column
                    title="设备代码"
                    dataIndex="device_code"
                    key="device_code"
                    width={200}
                  />
                  <Table.Column title="是否待维修" dataIndex="repair" key="repair" width={200} />
                  <Table.Column
                    title="是否待维保"
                    dataIndex="maintain"
                    key="maintain"
                    width={200}
                  />
                </Table>
                <Table
                  style={{ width: '100%' }}
                  bordered
                  size="small"
                  pagination={false}
                  dataSource={[record]}
                >
                  <Table.Column title="注册代码" dataIndex="reg_code" key="reg_code" width={200} />
                  <Table.Column
                    title="创建时间"
                    dataIndex="created_at"
                    key="created_at"
                    width={200}
                  />
                  <Table.Column
                    title="更新时间"
                    dataIndex="updated_at"
                    key="updated_at"
                    width={200}
                  />
                  <Table.Column title="购买时间" dataIndex="buy_at" key="buy_at" width={200} />
                </Table>
                <Table
                  style={{ width: '100%' }}
                  bordered
                  size="small"
                  pagination={false}
                  dataSource={[record]}
                >
                  <Table.Column
                    title="上次维保时间"
                    dataIndex="last_maintain"
                    key="last_maintain"
                    width={200}
                  />
                  <Table.Column
                    title="上次维修时间"
                    dataIndex="last_repair"
                    key="last_repair"
                    width={200}
                  />
                  <Table.Column title="启动时间" dataIndex="start_at" key="start_at" width={200} />
                  <Table.Column title="负责人" dataIndex="user" key="user" width={200} />
                </Table>
              </Card>
              <Card title="电梯图片">
                <img style={{ width: '70%' }} src={picUrl ?? ''} />
              </Card>
              <Card title="电梯相关文件">
                <iframe
                  title="File Preview"
                  width="100%"
                  height="900px"
                  src={`data:application/pdf;base64,${fileBlob}`}
                />{' '}
              </Card>
              <Card title="负责人详细信息">
                <ProTable
                  actionRef={actionRef}
                  rowKey="id"
                  search={false}
                  columns={columns_user}
                  request={async (params = {}) => {
                    const response = await queryUser({ ...params, id: id, belongto: belongto });
                    console.log({ response });
                    return {
                      success: response.code === 200,
                      data: response!.data!.list,
                      page: response!.data!.page_num,
                      total: response!.data!.total,
                    };
                  }}
                />
              </Card>
              <Card title="供货商详细信息">
                <ProTable
                  actionRef={actionRef}
                  rowKey="id"
                  search={false}
                  columns={columns_sup}
                  request={async (params = {}) => {
                    const response = await querySup({ ...params, name: sup, belongto: belongto });
                    console.log({ response });
                    return {
                      success: response.code === 200,
                      data: response!.data!.list,
                      page: response!.data!.page_num,
                      total: response!.data!.total,
                    };
                  }}
                />
              </Card>
              <Card title="生产厂家详细信息">
                <ProTable
                  actionRef={actionRef}
                  rowKey="id"
                  search={false}
                  columns={columns_man}
                  request={async (params = {}) => {
                    const response = await queryMan({ ...params, name: man, belongto: belongto });
                    console.log({ response });
                    return {
                      success: response.code === 200,
                      data: response!.data!.list,
                      page: response!.data!.page_num,
                      total: response!.data!.total,
                    };
                  }}
                />
              </Card>
            </DrawerForm>

            <a
              type={'primary'}
              size={'small'}
              onClick={() => {
                console.log({ record });
                form.setFieldsValue(record);
                setBlob({ blob: record.pic });
                console.log({ blob });
                if (record.pic) setPicUrl(`data:image/png;base64,${record.pic}`);
                else setPicUrl(null);
                setFileBlob(record.doc);
                handleUpdateModalVisible(true);
              }}
            >
              编辑
            </a>
            <Popconfirm title={'确认删除？'} onConfirm={() => handleDelete(record.id!)}>
              <a>删除</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const [form] = ProForm.useForm<TableListItem>();
  useEffect(() => {
    form.setFieldsValue({ ...row });
  }, []);
  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        onSubmit={(params) => queryProfile(params)}
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
          const rsp = await queryCurrentUser();
          console.log({ rsp });
          const id = rsp.data?.id;
          setId(id);
          const belongto = rsp.data?.belongto;
          setBelongto(belongto);
          const response = await queryProfile({ ...params, belongto: belongto });
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
            value.belongto = belongto;
            value.maintain = 0;
            value.repair = 0;
            value.doc = fileBlob;
            value.buy_at = new Date(value.buy_at);
            value.start_at = new Date(value.start_at);
            value.pic = blob;
            // value.last_maintain = new Date(value.last_maintain);
            // value.last_repair = new Date(value.last_repair);
            console.log({ value });
            const response = await addProfile(value as TableListItem);
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
            setBlob(null);
            setFileBlob(null);
          }}
        >
          <ProFormText
            name={'name'}
            width="md"
            label={'电梯标题'}
            placeholder={'请输入电梯标题'}
            rules={[
              {
                required: true,
                message: '请输入电梯标题',
              },
            ]}
          />
          <ProFormText
            name={'status'}
            width="md"
            label={'电梯状态'}
            placeholder={'请输入电梯状态'}
            rules={[
              {
                required: true,
                message: '请输入电梯状态',
              },
            ]}
            request={async () => {
              const response = await await queryCondition({
                belongto: belongto,
              });
              console.log({ response });
              return response.data.list!.map((item: { name: any; id: any }) => {
                return {
                  label: item.name,
                  value: item.name,
                };
              });
            }}
          />
          <ProFormText
            name={'type'}
            width="md"
            label={'电梯类型'}
            placeholder={'请输入电梯类型'}
            rules={[
              {
                required: true,
                message: '请输入电梯类型',
              },
            ]}
            request={async () => {
              const response = await await queryType({
                belongto: belongto,
              });
              console.log({ response });
              return response.data.list!.map((item: { name: any; id: any }) => {
                return {
                  label: item.name,
                  value: item.name,
                };
              });
            }}
          />
          <ProFormText
            name={'location'}
            label={'安装位置'}
            width="md"
            placeholder={'安装位置'}
            rules={[
              {
                required: true,
                message: '请输入安装位置',
              },
            ]}
            request={async () => {
              const response = await await queryLocation({
                belongto: belongto,
              });
              console.log({ response });
              return response.data.list!.map((item: { name: any; id: any }) => {
                return {
                  label: item.name,
                  value: item.name,
                };
              });
            }}
          />
          <ProFormText
            name={'spec'}
            label={'规格'}
            width="sm"
            placeholder={'请输入规格'}
            rules={[
              {
                required: true,
                message: '请输入规格',
              },
            ]}
          />
          <ProFormText
            name={'device_code'}
            width="md"
            label={'设备代码'}
            placeholder={'请输入设备代码'}
            rules={[
              {
                required: true,
                message: '请输入设备代码',
              },
            ]}
          />
          <ProFormText
            name={'user'}
            label={'负责人'}
            width="md"
            placeholder={'请输入负责人'}
            rules={[
              {
                required: true,
                message: '请输入负责人',
              },
            ]}
            request={async () => {
              const response = await await queryUser({
                belongto: belongto,
              });
              console.log({ response });
              return response.data!.list!.map((item: { username: any; id: any }) => {
                return {
                  label: item.username,
                  value: item.username,
                };
              });
            }}
          />
          <ProFormText
            name={'man'}
            label={'生产厂家'}
            width="md"
            placeholder={'请输入生产厂家'}
            rules={[
              {
                required: true,
                message: '请输入生产厂家',
              },
            ]}
            request={async () => {
              const response = await await queryMan({
                belongto: belongto,
              });
              console.log({ response });
              return response.data!.list!.map((item: { name: any; id: any }) => {
                return {
                  label: item.name,
                  value: item.name,
                };
              });
            }}
          />
          <ProFormText
            name={'sup'}
            label={'供货商'}
            width="md"
            placeholder={'请输入供货商'}
            rules={[
              {
                required: true,
                message: '请输入供货商',
              },
            ]}
            request={async () => {
              const response = await await querySup({
                belongto: belongto,
              });
              console.log({ response });
              return response.data!.list!.map((item: { name: any; id: any }) => {
                return {
                  label: item.name,
                  value: item.name,
                };
              });
            }}
          />
          <ProFormDateTimePicker
            name={'buy_at'}
            label={'购买时间'}
            width="md"
            placeholder={'请输入购买时间'}
            rules={[
              {
                required: true,
                message: '请输入购买时间',
              },
            ]}
          />
          <ProFormDateTimePicker
            name={'start_at'}
            label={'启动时间'}
            width="md"
            placeholder={'请输入启动时间'}
            rules={[
              {
                required: true,
                message: '请输入启动时间',
              },
            ]}
          />
          <ProFormText
            name={'maintaintype'}
            width="md"
            label={'保养等级与频次'}
            placeholder={'请输入保养等级与频次'}
            rules={[
              {
                required: true,
                message: '请输入保养等级与频次',
              },
            ]}
            request={async () => {
              const response = await await queryMaintain({
                belongto: belongto,
              });
              console.log({ response });
              return response.data!.list!.map((item: { name: any; id: any }) => {
                return {
                  label: item.name,
                  value: item.name,
                };
              });
            }}
          />
          <ProForm.Item label="相关文件(只接受pdf)" valuePropName="defaultFileList" required>
            <ProFormUploadButton
              accept=".pdf"
              onChange={(info) => {
                if (info.file.status === 'done') {
                  handleUpload(info.file);
                }
              }}
            />
          </ProForm.Item>
          <ProForm.Item label="电梯图片" valuePropName="defaultFileList" required>
            <Upload name="pic" listType="picture-card" beforeUpload={beforeUpload}>
              <div>{<PlusOutlined />}</div>
            </Upload>
          </ProForm.Item>
          <ProFormText
            name={'reg_code'}
            label={'注册代码'}
            placeholder={'请输入注册代码'}
            rules={[
              {
                required: true,
                message: '请输入注册代码',
              },
            ]}
          />
        </ModalForm>
      )}
      {updateModalVisible && (
        <ModalForm
          title="编辑"
          isKeyPressSubmit={true}
          width="450px"
          form={form}
          visible={updateModalVisible}
          onVisibleChange={handleUpdateModalVisible}
          modalProps={{
            centered: true,
          }}
          onFinish={async (value: TableListItem) => {
            value.belongto = belongto;
            value.buy_at = new Date(value.buy_at);
            value.start_at = new Date(value.start_at);
            if (blob == null || fileBlob == null) {
              message.error('有未填字段！');
              return false;
            }
            value.pic = blob[blob];
            value.doc = fileBlob;
            console.log({ value });
            const payload: TableListItem = {
              ...value,
            };
            const response = await updateProfile(payload);
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
            setBlob(null);
            setPicUrl('');
          }}
        >
          <ProFormText name={'id'} width="md" hidden />
          <ProFormText
            name={'name'}
            width="md"
            label={'电梯标题'}
            placeholder={'请输入电梯标题'}
            rules={[
              {
                required: true,
                message: '请输入电梯标题',
              },
            ]}
          />
          <ProFormText
            name={'status'}
            width="md"
            label={'电梯状态'}
            placeholder={'请输入电梯状态'}
            rules={[
              {
                required: true,
                message: '请输入电梯状态',
              },
            ]}
            request={async () => {
              const response = await await queryCondition({
                belongto: belongto,
              });
              console.log({ response });
              return response.data.list!.map((item: { name: any; id: any }) => {
                return {
                  label: item.name,
                  value: item.name,
                };
              });
            }}
          />
          <ProFormText
            name={'type'}
            width="md"
            label={'电梯类型'}
            placeholder={'请输入电梯类型'}
            rules={[
              {
                required: true,
                message: '请输入电梯类型',
              },
            ]}
            request={async () => {
              const response = await await queryType({
                belongto: belongto,
              });
              console.log({ response });
              return response.data.list!.map((item: { name: any; id: any }) => {
                return {
                  label: item.name,
                  value: item.name,
                };
              });
            }}
          />
          <ProFormText
            name={'location'}
            label={'安装位置'}
            width="md"
            placeholder={'安装位置'}
            rules={[
              {
                required: true,
                message: '请输入安装位置',
              },
            ]}
            request={async () => {
              const response = await await queryLocation({
                belongto: belongto,
              });
              console.log({ response });
              return response.data.list!.map((item: { name: any; id: any }) => {
                return {
                  label: item.name,
                  value: item.name,
                };
              });
            }}
          />
          <ProFormText
            name={'spec'}
            label={'规格'}
            width="sm"
            placeholder={'请输入规格'}
            rules={[
              {
                required: true,
                message: '请输入规格',
              },
            ]}
          />
          <ProFormText
            name={'device_code'}
            width="md"
            label={'设备代码'}
            placeholder={'请输入设备代码'}
            rules={[
              {
                required: true,
                message: '请输入设备代码',
              },
            ]}
          />
          <ProFormText
            name={'user'}
            label={'负责人'}
            width="md"
            placeholder={'请输入负责人'}
            rules={[
              {
                required: true,
                message: '请输入负责人',
              },
            ]}
            request={async () => {
              const response = await await queryUser({
                belongto: belongto,
              });
              console.log({ response });
              return response.data!.list!.map((item: { username: any; id: any }) => {
                return {
                  label: item.username,
                  value: item.username,
                };
              });
            }}
          />
          <ProFormText
            name={'man'}
            label={'生产厂家'}
            width="md"
            placeholder={'请输入生产厂家'}
            rules={[
              {
                required: true,
                message: '请输入生产厂家',
              },
            ]}
            request={async () => {
              const response = await await queryMan({
                belongto: belongto,
              });
              console.log({ response });
              return response.data!.list!.map((item: { name: any; id: any }) => {
                return {
                  label: item.name,
                  value: item.name,
                };
              });
            }}
          />
          <ProFormText
            name={'sup'}
            label={'供货商'}
            width="md"
            placeholder={'请输入供货商'}
            rules={[
              {
                required: true,
                message: '请输入供货商',
              },
            ]}
            request={async () => {
              const response = await await querySup({
                belongto: belongto,
              });
              console.log({ response });
              return response.data!.list!.map((item: { name: any; id: any }) => {
                return {
                  label: item.name,
                  value: item.name,
                };
              });
            }}
          />
          <ProFormDateTimePicker
            name={'buy_at'}
            label={'购买时间'}
            width="md"
            placeholder={'请输入购买时间'}
            rules={[
              {
                required: true,
                message: '请输入购买时间',
              },
            ]}
          />
          <ProFormDateTimePicker
            name={'start_at'}
            label={'启动时间'}
            width="md"
            placeholder={'请输入启动时间'}
            rules={[
              {
                required: true,
                message: '请输入启动时间',
              },
            ]}
          />
          <ProFormText
            name={'maintaintype'}
            width="md"
            label={'保养等级与频次'}
            placeholder={'请输入保养等级与频次'}
            rules={[
              {
                required: true,
                message: '请输入保养等级与频次',
              },
            ]}
            request={async () => {
              const response = await await queryMaintain({
                belongto: belongto,
              });
              console.log({ response });
              return response.data!.list!.map((item: { name: any; id: any }) => {
                return {
                  label: item.name,
                  value: item.name,
                };
              });
            }}
          />
          <ProForm.Item label="相关文件(只接受pdf)" valuePropName="defaultFileList" required>
            {fileBlob ? (
              <>
                <Button onClick={() => setPreviewFileVisible(true)}>预览</Button>
                <Button
                  onClick={() => {
                    setFileBlob(null);
                  }}
                >
                  删除
                </Button>
              </>
            ) : (
              <ProFormUploadButton
                accept=".pdf"
                onChange={(info) => {
                  if (info.file.status === 'done') {
                    handleUpload(info.file);
                  }
                }}
                fieldProps={{
                  name: 'doc',
                  multiple: true,
                  onPreview: () => {
                    setPreviewFileVisible(true);
                  },
                  onRemove: () => {
                    setFileBlob(null);
                  },
                }}
                initialValue={fileBlob}
              />
            )}
            <Modal
              visible={previewFileVisible}
              onCancel={() => {
                setPreviewFileVisible(false);
              }}
              footer={null}
            >
              <iframe
                title="File Preview"
                width="100%"
                height="900px"
                src={`data:application/pdf;base64,${fileBlob}`}
              />
            </Modal>
          </ProForm.Item>
          <ProForm.Item label="电梯图片(1张)" valuePropName="defaultFileList" required>
            <Upload
              listType="picture-card"
              name="pic"
              onRemove={() => {
                setPicUrl('');
                setBlob(null);
              }}
              beforeUpload={beforeUpload}
              onPreview={handlePreview}
              fileList={picUrl ? [{ uid: '-1', name: 'pic', status: 'done', url: picUrl }] : []}
            >
              {picUrl ? null : <div>{<PlusOutlined />}</div>}
            </Upload>
            <Modal
              visible={previewVisible}
              onCancel={() => {
                setPreviewVisible(false);
              }}
              footer={null}
            >
              <img style={{ width: '100%' }} src={picUrl ?? ''} />
            </Modal>
          </ProForm.Item>

          <ProFormText
            name={'reg_code'}
            label={'注册代码'}
            placeholder={'请输入注册代码'}
            rules={[
              {
                required: true,
                message: '请输入注册代码',
              },
            ]}
          />
        </ModalForm>
      )}
    </PageContainer>
  );
};
export default RbacEnterpriseList;
