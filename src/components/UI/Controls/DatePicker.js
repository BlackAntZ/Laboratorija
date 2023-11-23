import * as React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {useImperativeHandle, useRef} from "react";
import 'dayjs/locale/de';

const DatePicker = React.forwardRef(({ name, label, value, onChange, onKeyPress, disabled, readOnly}, ref) => {
  const inputRef = useRef();

  const focus = () => {
    inputRef.current['focus']();
    inputRef.current['select']();
  };

  useImperativeHandle(ref, () => {
    return {focus: focus}
  });

  const convertToDefEventPara = (name, value) => ({
    target: {
      name, value
    }
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='de'>
      <DesktopDatePicker
        inputRef={inputRef}
        inputFormat="DD.MM.YYYY"
        label={label}
        name={name}
        readOnly={readOnly}
        disabled={disabled}
        value={value}
        onChange={date => onChange(convertToDefEventPara(name,date))}
        renderInput={(params) => <TextField {...params} inputProps={{ ...params.inputProps, onKeyUp: onKeyPress }} name={`${name}_input`} />}
      />
    </LocalizationProvider>
  );
})

export default DatePicker;