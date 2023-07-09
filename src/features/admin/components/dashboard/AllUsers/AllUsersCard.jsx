import React from 'react'
import DeleteDialogue from './DeleteDialogue'
import AlertSuccess from '../../../../../../components/Alert/AlertSuccess'
import Loading from '../../../../../../components/Loading'
import { useGetUsersQuery } from '@/slices/api/apiSlice'
import { useAddBalanceMutation } from '@/slices/api/balanceApi'
import UserActivities from './UserActivities'
import { toast } from 'react-hot-toast'
import { Box } from '@mui/material'
import Image from 'next/image'

const AllUsersCard = ({ searchUser }) => {
  const { data } = useGetUsersQuery()
  // console.log(typeof data[0].memberId)
  const [addBalance, { isSuccess, isLoading, data: response }] =
    useAddBalanceMutation()
  const [agree, setAgree] = React.useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const amount = +form.amount.value
    const memberName = form.name.value
    const memberId = +form.id.value
    const data = {
      amount,
      memberName,
      memberId
    }
    // console.log(data)
    addBalance(data)
  }
  // add balance api response
  // console.log(response)

  if (isLoading) {
    return <Loading />
  }
  if (isSuccess === true) {
    toast.success('Money added!')
  }

  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-7'>
      {searchUser?.length === 0 ? (
        <Box>No user found. Please add an user</Box>
      ) : (
        searchUser?.map((user) => (
          <div
            key={user._id}
            className='card card-compact w-[360px] bg-base-100 shadow-2xl p-2'>
            <div className='card-body'>
              <div>
                <img
                  className='rounded-lg'
                  width={'100px'}
                  height={'100px'}
                  src={
                    user?.image
                      ? user.image
                      : 'https://www.aquasafemine.com/wp-content/uploads/2018/06/dummy-man-570x570.png'
                  }
                  alt='profile'
                />
                <p className='text-start text-lg'>
                  Member ID: {user?.memberId}
                </p>
              </div>
              <div className='flex justify-between'>
                <div>
                  <h2 className='text-start text-lg'>{user?.name}</h2>
                  <p>{user?.address}</p>
                  <span>Total Balance: </span>
                  <p
                    className={`inline text-start text-lg py-2 ${
                      user?.totalBalance === 0
                        ? 'text-red-300'
                        : 'text-green-300'
                    }`}>
                    {user?.totalBalance}
                  </p>
                </div>
                <DeleteDialogue
                  id={user?._id}
                  name={user?.name}
                  agree={agree}
                  setAgree={setAgree}
                />
              </div>
              <UserActivities memberId={user?.memberId} name={user?.name} />
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
                <button type='submit' className='btn btn-info btn-outline'>
                  add
                </button>
              </form>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default AllUsersCard
