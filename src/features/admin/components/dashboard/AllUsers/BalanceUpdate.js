import {
  useAddBalanceMutation,
  useGetBalanceQuery,
} from '@/slices/api/balanceApi';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
} from '@mui/material';
import React from 'react';
import toast from 'react-hot-toast';
import { BiEdit } from 'react-icons/bi';

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide
      direction='up'
      ref={ref}
      {...props}
    />
  );
});

const BalanceUpdate = ({ user }) => {
  const { totalBalance, memberId, name } = user;
  const { data: balance } = useGetBalanceQuery();
  const [addBalance] = useAddBalanceMutation();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const famount = +form.amount.value;
    const memberName = form.name.value;
    const memberId = +form.id.value;
    let lamount = form.lamount?.value;

    let amount = famount - lamount;

    // let amount = totalBalance - camount;
    // let amount = camount - totalBalance;

    const data = {
      amount,
      memberName,
      memberId,
    };
    // console.log(data);
    if (famount < lamount) {
      addBalance(data);
    } else {
      toast.error('Add balance from the front page');
    }
    form.reset();
  };

  const paymentInfo = balance?.result?.filter(
    (uid) => uid?.memberId == memberId && uid.amount > 0
  );

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        endIcon=''
        size='medium'
        // variant='outlined'
        color='info'>
        <BiEdit className='mb-1 cursor-pointer' />
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
          {user.name}
          <Button
            onClick={handleClose}
            size='medium'
            fontWeight='bold'
            fontSize={24}
            className='btn btn-sm btn-circle btn-error btn-outline float-right'>
            X
          </Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            <p className='pb-2'>Total Balance: {totalBalance}</p>
            <form
              onSubmit={handleSubmit}
              className=''>
              <p className='mb-3'>
                {' '}
                <label>Last Paid Amount:</label>
                {paymentInfo?.slice(0, 1)?.map((amt) => (
                  <>
                    <input
                      readOnly
                      type='text'
                      name='lamount'
                      value={amt.amount}
                    />
                  </>
                ))}
              </p>
              <input
                readOnly
                hidden
                type='text'
                name='name'
                value={user?.name}
              />
              <input
                readOnly
                hidden
                type='number'
                name='id'
                value={user?.memberId}
              />
              <span className='flex flex-col md:flex-row md:justify-between gap-4 '>
                <input
                  type='number'
                  placeholder='Enter correct amount'
                  name='amount'
                  className='input input-bordered'
                  min={1}
                />
                <button
                  type='submit'
                  className='btn btn-info btn-outline'>
                  submit
                </button>
              </span>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BalanceUpdate;

// <div>
//     <label htmlFor='updateModal'>
//       <BiEdit className=' ml-3 mt-1 cursor-pointer' />
//     </label>
//     <input
//       type='checkbox'
//       id='updateModal'
//       className='modal-toggle'
//     />
//     <div
//       className='modal'
//       role='dialog'>
//       <div className='modal-box '>
//         <h3 className='font-bold text-lg'>{name}</h3>
//         <p className='py-2'>Total Balance: {totalBalance}</p>
// <form
//   onSubmit={handleSubmit}
//   className=''>
//   <p className='mb-3'>
//     {' '}
//     {paymentInfo?.slice(0, 1)?.map((amt) => (
//       <>
//         <label>Last Paid Amount:</label>
//         <input
//           readOnly
//           type='text'
//           name='lamount'
//           value={amt.amount}
//         />
//       </>
//     ))}
//   </p>
//   <input
//     readOnly
//     hidden
//     type='text'
//     name='name'
//     value={user?.name}
//   />
//   <input
//     readOnly
//     hidden
//     type='number'
//     name='id'
//     value={user?.memberId}
//   />
//   <span className='flex justify-between'>
//     <input
//       type='number'
//       placeholder='Enter correct amount'
//       name='amount'
//       className='input input-bordered'
//       min={1}
//     />
//     <button
//       type='submit'
//       className='btn btn-info btn-outline'>
//       submit
//     </button>
//   </span>
// </form>
//         <div className='modal-action'>
//           <label
//             htmlFor='updateModal'
//             className='btn btn-sm btn-circle btn-error btn-outline absolute right-2 top-2'>
//             X
//           </label>
//         </div>
//       </div>
//     </div>
//   </div>
