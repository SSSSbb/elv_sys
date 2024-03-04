// Profile.tsx

import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Descriptions, Avatar, Divider, Tag, Typography, message } from 'antd';
import { currentUser as queryCurrentUser } from '@/services/api';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { queryEnterprise } from '../rbac/enterprise/service';
import { queryUser, updateUser } from '../rbac/user/service';
import { TableListItem } from '../rbac/user/data';
import ProForm, { ModalForm, ProFormText } from '@ant-design/pro-form';

const { Title, Paragraph } = Typography;

const Profile: React.FC = () => {
  const actionRef = useRef(); // Step 2: Create a ref using useRef
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [belongTo, setBelongTo] = useState<string>();
  const [roleId, setRoleId] = useState<number>();
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [form] = ProForm.useForm<TableListItem>();

  useEffect(() => {
    fetchCurrentUser();
  }, []);
  useEffect(() => {
    const fetchEnterpriseData = async () => {
      console.log({ currentUser });
      if (currentUser?.belongto) {
        try {
          const response = await queryEnterprise({ id: currentUser.belongto });
          console.log(currentUser);
          setBelongTo(response.data?.list[0].name);
        } catch (error) {
          console.error('Error fetching enterprise data:', error);
        }
      }
    };

    fetchEnterpriseData(); // 在 currentUser 更新时获取企业数据
  }, [currentUser]);
  useEffect(() => {
    const fetchRoleId = async () => {
      console.log({ currentUser });
      if (currentUser?.id) {
        try {
          const rsp = await queryUser({ belongto: currentUser?.belongto, id: currentUser?.id });
          console.log({ rsp });
          const role_id = rsp.data?.list[0].role_id;
          setRoleId(role_id);
        } catch (error) {
          console.error('Error fetching enterprise data:', error);
        }
      }
    };
    fetchRoleId();
  }, [currentUser]);

  const fetchCurrentUser = async () => {
    try {
      const response = await queryCurrentUser();
      setCurrentUser(response.data);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  return (
    <PageContainer>
      <Card>
        <div style={{ textAlign: 'center' }}>
          <Avatar size={64} style={{ backgroundColor: '#87d068' }}>
            {currentUser?.username?.charAt(0).toUpperCase()}
          </Avatar>{' '}
          <Title level={4} style={{ marginTop: 8 }}>
            {currentUser?.username}
          </Title>
        </div>
        <Divider />
        <Descriptions title="基本信息" bordered>
          <Descriptions.Item label="用户名">{currentUser?.username}</Descriptions.Item>
          <Descriptions.Item label="手机号">{currentUser?.mobile}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{currentUser?.created_at}</Descriptions.Item>
        </Descriptions>
        <Divider />
        <div>
          <Title level={4}>所属公司</Title>
          <Paragraph>{belongTo || '暂无'}</Paragraph>
        </div>

        <div>
          <Title level={4}>操作</Title>
          <a
            onClick={() => {
              setUpdateModalVisible(true);
              form.setFieldsValue({
                id: currentUser?.id,
                username: currentUser?.username,
                mobile: currentUser?.mobile,
                role_id: roleId,
              });
            }}
            style={{ marginRight: 16 }}
          >
            <EditOutlined /> 编辑个人信息
          </a>
          <ModalForm
            title="编辑用户"
            width="450px"
            isKeyPressSubmit={true}
            form={form}
            visible={updateModalVisible}
            onVisibleChange={setUpdateModalVisible}
            onFinish={async (value: TableListItem) => {
              const payload: TableListItem = {
                ...value,
              };
              const response = await updateUser(payload);
              const { code, msg } = response;
              if (code !== 200) {
                message.error(msg);
                return;
              }
              message.success(msg);
              setUpdateModalVisible(false);
              setCurrentUser((prevUser: any) => ({
                ...prevUser,
                username: value.username,
                mobile: value.mobile,
              }));
            }}
          >
            <ProFormText name="id" hidden />
            <ProFormText
              name="username"
              label="用户名"
              placeholder="请输入用户名"
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
            />
            <ProFormText name={'role_id'} hidden />
            <ProFormText
              name="mobile"
              label="手机号"
              placeholder="请输入手机号"
              rules={[
                {
                  required: true,
                  message: '请输入手机号',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              label="登录密码"
              placeholder="请输入登录密码，不修改不用输入"
            />
          </ModalForm>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Profile;
