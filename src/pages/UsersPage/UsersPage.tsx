import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Divider, Popconfirm, Table, message } from 'antd';
import React, { useCallback, useState } from 'react';

import { useUsersPage } from './useUsersPage';
import { IUserDTO } from 'src/user/user.types';
import { USERS_COLUMNS } from 'src/constants/columns';
import { Spinner } from 'src/components/Spinner';
import { AddUserModal } from 'src/components/AddUserModal';
import { EditUserModal } from 'src/components/EditUserModal';
import * as Styled from './UsersPage.styled';

export const UsersPage = () => {
  const [addModalVisibility, setAddModalVisibility] = useState(false);
  const [editModalVisibility, setEditModalVisibility] = useState(false);
  const [editingKey, setEditingKey] = useState(null);

  const { data, isLoading, handleAddUser, handleEditUser, handleDeleteUser } =
    useUsersPage();

  const confirm = useCallback(
    (id: string) => {
      handleDeleteUser(id);
    },
    [handleDeleteUser],
  );

  const cancel = () => {
    message.error('Canceled');
  };

  const onEditUser = useCallback(
    (item: IUserDTO) => {
      setEditingKey(item.id);
      setEditModalVisibility(true);
    },
    [setEditModalVisibility],
  );

  const prepareEditModalData = (data: IUserDTO[]) => {
    if (data?.length !== 0) {
      const userData = data?.find((item) => item.id === editingKey);
      return userData;
    }
  };

  const renderActionBtns = useCallback(
    (item: IUserDTO) => {
      return (
        <>
          <Button
            key={item.id}
            icon={<EditOutlined />}
            onClick={() => onEditUser(item)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => confirm(item.id)}
            onCancel={cancel}
          >
            <Button
              style={{
                background: '#ff4d4f',
                border: 'none',
                marginLeft: '5px',
              }}
              type="primary"
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Popconfirm>
        </>
      );
    },
    [confirm],
  );

  const renderData = (data: IUserDTO[]) => {
    if (!data) {
      return null;
    }

    return data.map((item) => ({
      ...item,
      action: renderActionBtns(item),
    }));
  };

  return (
    <>
      <Styled.HeaderContainer>
        <Styled.Header>Users</Styled.Header>
        <AddUserModal
          modalVisibility={addModalVisibility}
          setModalVisibility={setAddModalVisibility}
          submitCallback={handleAddUser}
        />
        <Button type="primary" onClick={() => setAddModalVisibility(true)}>
          Add User
        </Button>
      </Styled.HeaderContainer>
      <Divider />
      <Spinner spinning={isLoading}>
        <EditUserModal
          modalVisibility={editModalVisibility}
          submitCallback={handleEditUser}
          userData={prepareEditModalData(data)}
          editingKey={editingKey}
          setModalVisibility={setEditModalVisibility}
        />

        <Table
          rowKey="id"
          columns={USERS_COLUMNS}
          dataSource={renderData(data)}
        />
      </Spinner>
    </>
  );
};
