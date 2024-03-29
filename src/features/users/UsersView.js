import { LoadingButton } from '@mui/lab';
import { Button, Stack } from '@mui/material';
import UserModal from './UserModal';
import CardSkeleton from '../../../components/cardSkeleton';
// import Image from "next/image";

const UsersView = ({ searchUser, setPageSize, isLoading, totalCount }) => {
  // const { userData, setUserData } = useState({})

  // const handleModal = (user) => {
  // setUserData(user)
  // console.log(user, 'onClick')
  // };
  // console.log(searchUser?.releaseStatus);
  // const usr = searchUser.sort((a, b) => a.memberId - b.memberId);
  // console.log(usr);

  return (
    <div>
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {searchUser
            .sort((a, b) => a.memberId - b.memberId)
            ?.map((user) => (
              <div
                key={user?._id}
                className={`max-w-md p-6 bg-teal-125 border-2 shadow-lg text-black ${
                  user?.releaseStatus
                    ? 'bg-gray-300 shadow-md'
                    : 'bg-base-100 shadow-2xl'
                }`}>
                <div className='text-center mb-3'>
                  <span className='indicator'>
                    {user.releaseStatus ? (
                      <span className='indicator-item indicator-center indicator-middle badge badge-ghost opacity-60 text-2xl w-60 h-56 rounded-full font-semibold'>
                        অব্যাহতি
                      </span>
                    ) : null}
                    <img
                      src={user?.image}
                      alt='user image'
                      className='rounded-full w-60 h-56'
                    />
                  </span>
                </div>
                <div className='flex flex-col space-y-4'>
                  <div>
                    <h2 className='text-2xl font-semibold'>{user?.name}</h2>
                    <span className='text-sm text-black'>
                      {user?.role?.role || user?.role}
                    </span>
                    <br />
                    <span className='text-sm text-black'>
                      {user?.memberRole?.role || user?.memberRule}
                    </span>
                  </div>
                  <div className='space-y-1'>
                    <span>Total Balance: </span>
                    <p
                      className={`inline text-start text-lg py-2 ${
                        user?.totalBalance === 0
                          ? 'text-red-300'
                          : 'text-green-300'
                      }`}>
                      {user?.totalBalance}
                    </p>
                    <span className='flex items-center space-x-2 text-black'>
                      Member Id: {user?.memberId}
                    </span>
                    <span className='flex items-center space-x-2'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 512 512'
                        aria-label='Phonenumber'
                        className='w-4 h-4'>
                        <path
                          fill='currentColor'
                          d='M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z'></path>
                      </svg>
                      <span className='text-black'>{user?.mobile}</span>
                    </span>
                    <Button
                      variant='contained'
                      sx={{
                        mt: '15px',
                      }}
                      color={'primary'}>
                      <label
                        htmlFor={user?._id}
                        // onClick={() => handleModal(user)}
                        className='btn btn-ghost '>
                        See Details
                      </label>
                    </Button>
                  </div>
                </div>
                {user && <UserModal user={user}></UserModal>}
              </div>
            ))}
        </div>
      )}
      <Stack
        direction={'row'}
        gap={2}
        justifyContent={'end'}
        alignItems={'center'}
        my={5}>
        {totalCount > searchUser?.length ? (
          <LoadingButton
            onClick={() => setPageSize((pre) => pre + 10)}
            loading={isLoading}
            loadingPosition='start'
            variant='outlined'>
            <span>Load More</span>
          </LoadingButton>
        ) : (
          <LoadingButton
            disabled
            onClick={() => setPageSize((pre) => pre + 10)}
            loading={isLoading}
            loadingPosition='start'
            variant='outlined'>
            <span>Load More</span>
          </LoadingButton>
        )}
      </Stack>
    </div>
  );
};

export default UsersView;
