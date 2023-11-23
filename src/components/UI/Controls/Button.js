import React, {useRef, useImperativeHandle} from 'react'
import { Button as MuiButton, makeStyles } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5)
    },
    label: {
        textTransform: 'none'
    }
}))

const Button = React.forwardRef(({ text, size, color, variant, onClick}, ref) => {
    const inputRef = useRef();

    const focus = () => {
        inputRef.current['focus']();
    };

    useImperativeHandle(ref, () => {
        return {focus: focus}
    });
    const classes = useStyles();

    return (
        <MuiButton
            ref={inputRef}
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            classes={{ root: classes.root, label: classes.label }}>
            {text}
        </MuiButton>
    )
})

export default Button;
