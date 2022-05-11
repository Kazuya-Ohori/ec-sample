import React from 'react';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  formControl: {
    marginBottom: 16,
    minWidth: 128,
    width: '100%',
  },
});

const SelectBox = ({ label, requierd, select, options, value }) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Select
        requierd={requierd}
        onChange={(event) => select(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectBox;
