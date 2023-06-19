"use client"

import { forwardRef, useState, SyntheticEvent } from "react";

import { Snackbar } from "@mui/material"
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface props {
    text: string
    isOpen: boolean
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SuccessSnackBar({text, isOpen}: props) {
    const [open, setOpen] = useState(isOpen);

    const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {text}
            </Alert>
        </Snackbar>
    )
}