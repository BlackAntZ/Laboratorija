import React, {useImperativeHandle, useRef} from 'react';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';

const Select = React.forwardRef(({ name, label, value, error=null, onChange, options, disabled }, ref) => {
  const inputRef = useRef();
  const focus = () => {
    inputRef.current['focus']();
  };

  useImperativeHandle(ref, () => {
    return {focus: focus}
  });

  return (
    <FormControl variant="outlined" disabled={disabled}
                 {...(error && {error:true})}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        inputRef={inputRef}
        autoWidth={true}
        label={label}
        name={name}
        value={value}
        onChange={onChange}>
        {
          options.map(
            item => {
              let naziv = '';
              if (name === 'skladiste' || name === 'skladiste_grupa') naziv = `${item.id} - ${item.naziv}`;
              if (name === 'uputio') return <MenuItem key={item.fond_sifra_ljekara} value={item.fond_sifra_ljekara}>{`${item.ime} ${item.prezime}`}</MenuItem>
              return <MenuItem key={item.id} value={item.id}>{naziv}</MenuItem>
            }
          )
        }
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
})

export default Select;
