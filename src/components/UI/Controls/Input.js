import React, {useImperativeHandle, useRef} from 'react'
import { TextField } from '@material-ui/core';

const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef();

    const focus = () => {
        inputRef.current['focus']();
    };

    useImperativeHandle(ref, () => {
        return {focus: focus}
    });

    const { name, label, value,error=null, onChange, onKeyPress, ...other } = props;
    return (
        <TextField
            inputProps={{ onKeyUp: onKeyPress }}
            inputRef={inputRef}
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...other}
            {...(error && {error:true,helperText:error})}
        />
    )
})

export default Input;