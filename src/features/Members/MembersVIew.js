import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMembers } from '../../slices/membersSlice'
import MembersCard from './MembersCard'
import { useGetUsersQuery } from '@/slices/api/apiSlice'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useGetBalanceQuery } from '@/slices/api/balanceApi'
import { LoadingButton } from '@mui/lab'
import Link from 'next/link'

const MembersView = () => {
  const [visible, setVisible] = useState(3)
  const [btn, setBtn] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const { isLoading, members, error } = useSelector(
    (state) => state.membersReducer
  )
  const dispatch = useDispatch()
  // fetching user data
  const { data, isLoading: isLoadingUser } = useGetUsersQuery({
    page,
    pageSize
  })
  const userData = data?.sortedDataMemberRole
  const totalCount = data?.totalCount
  // fetching user balance data
  const { data: balanceQuery } = useGetBalanceQuery()
  const balanceData = balanceQuery?.result

  // Create an object to store the data and summation for all amount of a user
  const balance = {}
  // Iterate over the balanceData array
  if (balanceData) {
    for (const data of balanceData) {
      const memberId = data.memberId
      const amount = data.amount

      // Check if the memberId already exists in the balance object
      if (balance[memberId]) {
        // If it exists, add the amount to the existing total
        balance[memberId].amount += amount
      } else {
        // If it doesn't exist, initialize the object with the data
        balance[memberId] = {
          memberName: data.memberName,
          amount: amount,
          memberId: memberId
        }
      }
    }
  }

  // converting object to array
  const balanceArray = Object.values(balance)
  // console.log('balanceArray: ', balanceArray)
  // console.log('data: ', data)

  const updatedData = userData?.map((member) => {
    const balance = balanceArray?.find(
      (balanceMember) => balanceMember.memberId === +member.memberId
    )
    if (balance) {
      // console.log(balance)
      return {
        ...member,
        totalBalance: balance.amount
      }
    } else
      return {
        ...member,
        totalBalance: 0
      }
  })

  useEffect(() => {
    dispatch(fetchMembers())
  }, [dispatch])

  const showAll = () => {
    const visible = members.length
    setVisible(visible)
    setBtn(true)
  }
  // const sortedDataMemberRole = updatedData?.sort(
  //   (a, b) => a?.memberRole?.id - b?.memberRole?.id
  // )

  console.log('updatedData: ', userData)

  return (
    <div className='text-center'>
      {isLoading && <h1 className=' text-xl font-bold'>Loading..........</h1>}
      {error && <h1 className=' text-xl font-bold'>{error}</h1>}
      {/* কার্যকরী কমিটির সদস্যবৃন্দ */}
      <Stack gap={5}>
        <Box sx={{ boxShadow: 3 }} p={5} borderRadius={5}>
          <h2 className='text-start font-semibold text-2xl mb-3'>
            <u>কার্যকরী কমিটির সদস্যবৃন্দ:-</u>
          </h2>
          {updatedData && (
            <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 items-center '>
              {updatedData
                .filter((f) => f?.role?.role === 'কার্যকরী কমিটি')
                .map((member) => (
                  <div key={member.id}>
                    <MembersCard member={member}></MembersCard>
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
            <Button variant='contained'>
              <Link href={'/users'}>See All Members</Link>
            </Button>
            {totalCount > updatedData.length && (
              <LoadingButton
                onClick={() => setPageSize((pre) => pre + 10)}
                loading={isLoadingUser}
                loadingPosition='start'
                variant='outlined'>
                <span>Load More</span>
              </LoadingButton>
            )}
          </Stack>
        </Box>
        {/* উপদেষ্টা কমিটির সদস্যবৃন্দ */}
        <Box sx={{ boxShadow: 3 }} p={5} borderRadius={5}>
          <h2 className='text-start font-semibold text-2xl mb-3'>
            <u>উপদেষ্টা কমিটির সদস্যবৃন্দ:-</u>
          </h2>
          {updatedData && (
            <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 items-center '>
              {updatedData
                .filter(
                  (f) =>
                    // condition need to change
                    f?.role?.role === 'উপদেষ্টা কমিটি'
                )
                .map((member) => (
                  <div key={member.id}>
                    <MembersCard member={member}></MembersCard>
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
            <Button variant='contained'>
              <Link href={'/users'}>See All Members</Link>
            </Button>
            {totalCount > updatedData.length && (
              <LoadingButton
                onClick={() => setPageSize((pre) => pre + 10)}
                loading={isLoadingUser}
                loadingPosition='start'
                variant='outlined'>
                <span>Load More</span>
              </LoadingButton>
            )}
          </Stack>
        </Box>
      </Stack>

      {/* <button
        onClick={showAll}
        className="mt-10 btn btn-primary"
        disabled={btn}
      >
        Show All
      </button> */}
    </div>
  )
}

export default MembersView
