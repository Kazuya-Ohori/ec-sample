/** @format */

import React from 'react';
import { TextField } from '@material-ui/core';

const TextInput = ({
  fullWidth = true,
  label,
  multiline = false,
  required = false,
  rows = 1,
  value,
  type = 'text',
  onChange,
}) => {
  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      margin='dense'
      multiline={multiline}
      required={required}
      minRows={rows}
      value={value}
      type={type}
      onChange={onChange}
    />
  );
};

export default TextInput;
