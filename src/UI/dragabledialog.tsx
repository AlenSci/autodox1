import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, {PaperProps} from '@mui/material/Paper';
import Draggable from 'react-draggable';
import {Divider, IconButton} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog(props:any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          {props.button}
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
            <IconButton autoFocus onClick={handleClose} aria-label="delete" size="small">
              <CancelIcon color='error' fontSize="inherit"/>
            </IconButton>
            {props.title}
          </DialogTitle>
          <Divider/>
          <DialogContent>
            {props.content}
          </DialogContent>

        </Dialog>
      </div>
  );
}
