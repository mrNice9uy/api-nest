import { Button, Divider, Form, Input, Modal } from 'antd';
import { isEmpty, pick } from 'lodash';
import React, { useCallback, useEffect } from 'react';

import {
  BUTTON_ITEM_LAYOUT,
  USER_MODAL_RULES,
  FORM_ITEM_LAYOUT,
} from '../../constants/constants';
import { IUserDTO } from 'src/user/user.types';

type EditUserModalProps = {
  modalVisibility: boolean;
  editingKey: string;
  userData: Partial<IUserDTO>;
  submitCallback: (values: IUserDTO) => void;
  setModalVisibility: (value: boolean) => void;
};
export const EditUserModal = ({
  modalVisibility,
  submitCallback,
  userData = {},
  setModalVisibility,
}: EditUserModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!isEmpty(userData)) {
      form.setFieldsValue(
        pick(userData, [
          'email',
          'firstName',
          'middleName',
          'lastName',
          'phone',
          'isActive',
          'role',
        ]),
      );
    }
  });

  const onFinish = useCallback(
    (values: IUserDTO) => {
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
      title="Edit user"
      open={modalVisibility}
      afterClose={form.resetFields}
      footer={false}
      onCancel={onCancel}
    >
      <Form onFinish={onFinish} form={form} {...FORM_ITEM_LAYOUT}>
        <Form.Item
          id="email"
          label="Email"
          name="email"
          rules={USER_MODAL_RULES.email}
        >
          <Input />
        </Form.Item>
        <Form.Item id="firstName" label="First Name" name="firstName">
          <Input />
        </Form.Item>
        <Form.Item id="middleName" label="Middle Name" name="middleName">
          <Input />
        </Form.Item>
        <Form.Item id="lastName" label="Last Name" name="lastName">
          <Input />
        </Form.Item>
        <Form.Item id="phone" label="Phone" name="phone">
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
