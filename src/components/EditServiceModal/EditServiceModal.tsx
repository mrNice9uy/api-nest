import { Button, Divider, Form, Input, Modal } from 'antd';
import { isEmpty, pick } from 'lodash';
import React, { useCallback, useEffect } from 'react';

import {
  BUTTON_ITEM_LAYOUT,
  FORM_ITEM_LAYOUT,
} from '../../constants/constants';
import { IService } from 'src/service/service.types';

type EditServiceModalProps = {
  modalVisibility: boolean;
  editingKey: string;
  serviceData: Partial<IService>;
  submitCallback: (values: IService) => void;
  setModalVisibility: (value: boolean) => void;
};
export const EditServiceModal = ({
  modalVisibility,
  submitCallback,
  serviceData = {},
  setModalVisibility,
}: EditServiceModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!isEmpty(serviceData)) {
      form.setFieldsValue(
        pick(serviceData, ['name', 'description', 'price', 'id']),
      );
    }
  });

  const onFinish = useCallback(
    (values: IService) => {
      submitCallback(values);
      setModalVisibility(false);
      form.resetFields();
    },
    [setModalVisibility, submitCallback, form],
  );

  const onCancel = () => {
    setModalVisibility(false);
  };

  return (
    <Modal
      title="Edit user"
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
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
