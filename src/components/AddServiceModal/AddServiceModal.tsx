import { Button, Divider, Form, Input, Modal } from 'antd';
import React, { useCallback } from 'react';

import {
  BUTTON_ITEM_LAYOUT,
  FORM_ITEM_LAYOUT,
} from '../../constants/constants';
import { IServiceCreate } from 'src/service/service.types';

type AddServiceModalProps = {
  modalVisibility: boolean;
  setModalVisibility: (value: boolean) => void;
  submitCallback: (values: IServiceCreate) => void;
};
export const AddServiceModal = ({
  modalVisibility,
  setModalVisibility,
  submitCallback,
}: AddServiceModalProps) => {
  const [form] = Form.useForm();

  const onFinish = useCallback(
    (values: IServiceCreate) => {
      setModalVisibility(false);
      submitCallback(values);
      form.resetFields();
    },
    [setModalVisibility, submitCallback, form],
  );

  const onCancel = () => {
    setModalVisibility(false);
  };

  return (
    <Modal
      title="Create a new user"
      open={modalVisibility}
      afterClose={form.resetFields}
      footer={false}
      onCancel={onCancel}
    >
      <Form onFinish={onFinish} form={form} {...FORM_ITEM_LAYOUT}>
        <Form.Item id="name" label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item id="description" label="Description" name="description">
          <Input />
        </Form.Item>
        <Form.Item id="price" label="Price" name="price">
          <Input />
        </Form.Item>
        <Divider />
        <Form.Item {...BUTTON_ITEM_LAYOUT}>
          <Button key="cancel" id="contact-modal-cancel-btn" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="primary"
            key="submit"
            id="contact-modal-submit-btn"
            htmlType="submit"
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
