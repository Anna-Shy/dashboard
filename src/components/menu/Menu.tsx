import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

import './menu.scss';

export const Menu = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const AlertInfo = () => {
        return (
            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Attention"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Been soon ...
                            Just wait)) 
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        )
    }

    return (
        <nav className="menu">
            <React.Fragment>
                <Button
                    disabled={false}
                    size="medium"
                    variant="outlined"
                    className='menu-btn'
                    onClick={handleClickOpen}
                >
                    Info
                </Button>
                {AlertInfo()}
            </React.Fragment>
            <React.Fragment>
                <Button
                    disabled={false}
                    size="medium"
                    variant="outlined"
                    className='menu-btn'
                    onClick={handleClickOpen}
                >
                    Update data
                </Button>
                {AlertInfo()}
            </React.Fragment>
        </nav>
    )
}

