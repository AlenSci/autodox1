import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

export default function AlertDialog(props:any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{display:'flex', margin:0}}>
      <Button
          style={{fontWeight: 'bold'}}
          color='primary' variant="outlined" onClick={handleClickOpen}>
        sign in/up
      </Button>


      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {props.children}
      </Dialog>
    </div>
  );
}
