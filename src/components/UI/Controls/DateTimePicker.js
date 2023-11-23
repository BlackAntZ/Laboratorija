import React, {useImperativeHandle, useRef} from 'react';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import {DesktopDateTimePicker} from "@mui/x-date-pickers";
import 'dayjs/locale/de';

const DateTimePicker = React.forwardRef(({ name, label, value, onChange, onKeyPress, error, readOnly, disabled}, ref) => {
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
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='de' >
      <DesktopDateTimePicker
        inputRef={inputRef}
        label={label}
        ampm={false}
        readOnly={readOnly}
        disabled={disabled}
        name={name}
        value={value}
        onChange={date => onChange(convertToDefEventPara(name,date))}
        renderInput={(params) => <TextField {...params} inputProps={{ ...params.inputProps, onKeyUp: onKeyPress }}
                                            {...(error && {error:true,helperText:error})} name={`${name}_input`} />}
      />
    </LocalizationProvider>
  );
});

export default DateTimePicker;