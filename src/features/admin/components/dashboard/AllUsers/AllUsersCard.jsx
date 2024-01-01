import { useAddBalanceMutation } from '@/slices/api/balanceApi';
import { Box } from '@mui/material';
import React from 'react';
import { toast } from 'react-hot-toast';
import Loading from '../../../../../../components/Loading';
import BalanceUpdate from './BalanceUpdate';
import DeleteDialogue from './DeleteDialogue';
import UpdateProfile from './UpdateProfile';
import UserActivities from './UserActivities';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const AllUsersCard = ({ searchUser, page }) => {
  const [addBalance, { isSuccess, isLoading, data: response }] =
    useAddBalanceMutation();
  const [agree, setAgree] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const amount = +form.amount.value;
    const memberName = form.name.value;
    const memberId = +form.id.value;
    const data = {
      amount,
      memberName,
      memberId,
    };

    addBalance(data);
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isSuccess === true) {
    toast.success('Money added!');
  }

  // console.log(searchUser);

  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-7'>
      {searchUser?.length === 0 ? (
        <Box>No user found. Please add an user</Box>
      ) : (
        searchUser?.slice(9 * (page - 1), page * 9)?.map((user) => (
          <div
            key={user._id}
            className='card card-compact w-[360px] bg-base-100 shadow-2xl p-2'>
            <div className='card-body'>
              <div className='flex justify-between items-start'>
                <UpdateProfile user={user}></UpdateProfile>
                <span className='indicator '>
                  {user.releaseStatus ? (
                    <span className='indicator-item indicator-center indicator-middle badge badge-primary bg-opacity-60 text-2xl w-52 h-52 rounded-full font-semibold'>
                      অব্যাহতি
                    </span>
                  ) : null}
                  <img
                    className='rounded-full float-left w-60 h-52 '
                    width={'100px'}
                    height={'80px'}
                    src={
                      user?.image
                        ? user.image
                        : 'https://www.aquasafemine.com/wp-content/uploads/2018/06/dummy-man-570x570.png'
                    }
                    alt='profile'
                  />{' '}
                </span>
                <span className='float-right'>
                  <DeleteDialogue
                    // id={user?.memberId}
                    // name={user?.name}
                    user={user}
                    agree={agree}
                    setAgree={setAgree}
                  />
                </span>
              </div>
              <p className='text-start text-lg'>Member ID: {user?.memberId}</p>
              <div className='flex justify-between'>
                <div>
                  <h2 className='text-start text-lg'>{user?.name}</h2>
                  <p>{user?.address}</p>
                  <span>Total Balance: </span>
                  <p className='inline-flex text-start text-lg'>
                    <span
                      className={` ${
                        user?.totalBalance === 0
                          ? 'text-red-300'
                          : 'text-green-300'
                      }`}>
                      {user?.totalBalance}
                    </span>
                    <BalanceUpdate
                      user={user}
                      memberId={user?.memberId}
                      name={user?.name}></BalanceUpdate>
                  </p>
                </div>
              </div>
              <UserActivities
                memberId={user?.memberId}
                name={user?.name}
              />
              <form
                onSubmit={handleSubmit}
                className='flex justify-between mt-3'>
                <input
                  type='number'
                  placeholder='amount'
                  name='amount'
                  className='input input-bordered'
                  min={1}
                />
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
                <button
                  type='submit'
                  className='btn btn-info btn-outline'>
                  add
                </button>
              </form>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AllUsersCard;
