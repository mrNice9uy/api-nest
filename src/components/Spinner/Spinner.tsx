import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import PropTypes from 'prop-types';

const antIcon = <LoadingOutlined spin />;

export const Spinner = ({ spinning, children }) => (
  <Spin
    tip="Loading..."
    className="loading-spin"
    spinning={spinning}
    indicator={antIcon}
  >
    {children}
  </Spin>
);

Spinner.propTypes = {
  spinning: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

Spinner.defaultProps = {
  children: null,
};
