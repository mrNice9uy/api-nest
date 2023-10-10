import React, { useCallback, useState } from 'react';
import { Button, Divider, Popconfirm, Table, message } from 'antd';
import * as Styled from './ServicePage.styled';
import { useServicePage } from './useServicePage';
import { Spinner } from 'src/components/Spinner';
import { SERVICE_COLUMNS } from 'src/constants/columns';
import { IService } from 'src/service/service.types';
import { AddServiceModal } from 'src/components/AddServiceModal';
import { EditServiceModal } from 'src/components/EditServiceModal';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export const ServicePage = () => {
  const [addModalVisibility, setAddModalVisibility] = useState(false);
  const [editModalVisibility, setEditModalVisibility] = useState(false);
  const [editingKey, setEditingKey] = useState(null);

  const {
    data,
    isLoading,
    handleAddService,
    handleEditService,
    handleDeleteService,
  } = useServicePage();

  const confirm = useCallback(
    (id: string) => {
      handleDeleteService(id);
    },
    [handleDeleteService],
  );

  const cancel = () => {
    message.error('Canceled');
  };

  const onEditService = useCallback(
    (item: IService) => {
      setEditingKey(item.id);
      localStorage.setItem('editingKey', item.id);
      setEditModalVisibility(true);
    },
    [setEditModalVisibility],
  );

  const prepareEditModalData = (data: IService[]) => {
    if (data?.length !== 0) {
      const serviceData = data?.find((item) => item.id === editingKey);
      return serviceData;
    }
  };

  const renderActionBtns = useCallback(
    (item: IService) => {
      return (
        <>
          <Button
            key={item.id}
            icon={<EditOutlined />}
            onClick={() => onEditService(item)}
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

  const renderData = (data: IService[]) => {
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
        <Styled.Header>Services</Styled.Header>
        <AddServiceModal
          modalVisibility={addModalVisibility}
          setModalVisibility={setAddModalVisibility}
          submitCallback={handleAddService}
        />
        <Button type="primary" onClick={() => setAddModalVisibility(true)}>
          Add Service
        </Button>
      </Styled.HeaderContainer>
      <Divider />
      <Spinner spinning={isLoading}>
        <EditServiceModal
          modalVisibility={editModalVisibility}
          submitCallback={handleEditService}
          serviceData={prepareEditModalData(data)}
          editingKey={editingKey}
          setModalVisibility={setEditModalVisibility}
        />

        <Table
          rowKey="id"
          columns={SERVICE_COLUMNS}
          dataSource={renderData(data)}
        />
      </Spinner>
    </>
  );
};
