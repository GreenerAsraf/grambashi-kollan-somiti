import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
} from '@/slices/api/apiSlice';
import AlertSuccess from '../../../../../../components/Alert/AlertSuccess';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { FormControl } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide
      direction='up'
      ref={ref}
      {...props}
    />
  );
});

export default function DeleteDialogue({ user }) {
  const [open, setOpen] = React.useState(false);

  const [deleteUser, { isSuccess }] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  console.log(user);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    const info = {
      ...user,
      memberId: user.memberId,
      releaseStatus: true,
    };
    setOpen(false);
    updateUser(info);
    // console.log(info);
  };

  const handleAgree = () => {
    setOpen(false);
    deleteUser(user.memberId);
  };
  if (isSuccess) {
    return (
      <AlertSuccess
        setOpen={true}
        message={'Action Successfull'}
      />
    );
  }

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        endIcon=''
        size='small'
        // variant='outlined'
        color='error'>
        <DeleteForeverIcon />
        {/* Parmanent Delete */}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'>
        <DialogTitle
          fontWeight={'bold'}
          color={'red'}
          fontSize={19}>
          {'Do you want to delete user?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            {user.name}
          </DialogContentText>
          <DialogActions sx={{ mt: 2 }}>
            <Button
              onClick={handleClose}
              variant='contained'
              color='error'>
              Realesed from post
            </Button>
            <Button
              onClick={handleAgree}
              variant='contained'
              color='error'>
              Parmanently delete{' '}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
