import React from 'react';
import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Radio } from '@material-ui/core';

export default function RadioGroup(props) {

  const { name, label, value, onChange, items, disabled } = props;

  return (
    <FormControl>
      <div style={{display: "flex", gap: "1rem", alignItems: "center"}}>
        <FormLabel>{label}</FormLabel>
        <MuiRadioGroup
          row
          name={name}
          value={value}
          onChange={onChange}>
          {
            items.map(
              item => (
                <FormControlLabel key={item.id} value={item.id} disabled={disabled} control={<Radio color={items.indexOf(item) === 0 ? 'primary' : "secondary"} />} label={item.title}/>
              )
            )
          }
        </MuiRadioGroup>
      </div>
    </FormControl>
  )
}
