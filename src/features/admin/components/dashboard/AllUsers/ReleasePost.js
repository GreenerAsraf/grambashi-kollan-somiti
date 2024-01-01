import { useUpdateUserMutation } from '@/slices/api/apiSlice';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';
import React from 'react';
import AlertSuccess from '../../../../../../components/Alert/AlertSuccess';

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide
      direction='up'
      ref={ref}
      {...props}
    />
  );
});

const ReleasePost = ({ id, name }) => {
  const [open, setOpen] = React.useState(false);
  // const [agree, setAgree] = React.useState(false)
  // console.log(user);

  const [updateUser, { isSuccess }] = useUpdateUserMutation();
  // console.log(isSuccess)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    const info = {
      releaseStatus: 'release',
    };
    setOpen(false);
    updateUser(info);
    // console.log(info);
  };
  if (isSuccess) {
    return (
      <AlertSuccess
        setOpen={true}
        message={'User Released'}
      />
    );
  }
  return (
    <div>
      <Button
        onClick={handleClickOpen}
        endIcon=''
        size='medium'
        sx={{ mt: 2 }}
        variant='contained'
        color='error'>
        Release From Post
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'>
        <DialogTitle
          fontWeight={''}
          color={'red'}
          fontSize={19}>
          {'Do you want to relese '}
          <span className='font-semibold italic'> {name}</span>
          {'?'}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleAgree}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReleasePost;
