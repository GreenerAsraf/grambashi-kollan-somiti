'use client';

import {
  useGetHomepageUsersQuery,
  useGetUsersQuery,
} from '@/slices/api/apiSlice';
import { useGetBalanceQuery } from '@/slices/api/balanceApi';
import { Box, Button, Stack } from '@mui/material';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardSkeleton from '../../../components/cardSkeleton';
import { fetchMembers } from '../../slices/membersSlice';
import MembersCard from './MembersCard';

const MembersView = () => {
  const { isLoading } = useSelector((state) => state.membersReducer);
  const dispatch = useDispatch();
  // fetching user data
  const { data, isLoading: isLoadingUser } = useGetHomepageUsersQuery({
    page: 1,
    // pageSize
  });
  const userData = data?.sortedHomepageUsers;
  const totalCount = data?.totalCount;
  // fetching user balance data
  const { data: balanceQuery } = useGetBalanceQuery();
  const balanceData = balanceQuery?.result;

  // Create an object to store the data and summation for all amount of a user
  const balance = {};
  // Iterate over the balanceData array
  if (balanceData) {
    for (const data of balanceData) {
      const memberId = data.memberId;
      const amount = data.amount;

      // Check if the memberId already exists in the balance object
      if (balance[memberId]) {
        // If it exists, add the amount to the existing total
        balance[memberId].amount += amount;
      } else {
        // If it doesn't exist, initialize the object with the data
        balance[memberId] = {
          memberName: data.memberName,
          amount: amount,
          memberId: memberId,
        };
      }
    }
  }

  // converting object to array
  const balanceArray = Object.values(balance);

  const updatedData = userData?.map((member) => {
    const balance = balanceArray?.find(
      (balanceMember) => balanceMember.memberId === +member.memberId
    );
    if (balance) {
      // console.log(balance)
      return {
        ...member,
        totalBalance: balance.amount,
      };
    } else
      return {
        ...member,
        totalBalance: 0,
      };
  });

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  return (
    <div className='text-center'>
      <Stack
        mt={2}
        gap={5}>
        <h2 className='text-start font-semibold text-2xl  decoration-neutral'>
          কার্যকরী কমিটির সদস্যবৃন্দ
        </h2>
        {isLoading ? (
          <CardSkeleton />
        ) : (
          <Box
            sx={{ boxShadow: 3 }}
            p={5}
            borderRadius={5}>
            {updatedData && (
              <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 items-center'>
                {updatedData
                  ?.filter(
                    (filterItem) => filterItem?.role?.role === 'কার্যকরী কমিটি'
                  )
                  ?.map((member) => (
                    <div key={member.id + '123'}>
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
              {/* {totalCount > updatedData?.length && (
                <LoadingButton
                  onClick={() => setPageSize((pre) => pre + 10)}
                  loading={isLoadingUser}
                  loadingPosition='start'
                  // startIcon={'loading'}
                  variant='outlined'>
                  <span>Load More</span>
                </LoadingButton>
              )} */}
            </Stack>
          </Box>
        )}

        <h2 className='text-start font-semibold text-2xl '>
          উপদেষ্টা কমিটির সদস্যবৃন্দ
        </h2>
        {isLoading ? (
          <CardSkeleton />
        ) : (
          <Box
            sx={{ boxShadow: 3 }}
            p={5}
            borderRadius={5}>
            {updatedData && (
              <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 items-center '>
                {updatedData
                  ?.filter(
                    (filterItem) => filterItem?.role?.role === 'উপদেষ্টা কমিটি'
                  )
                  ?.map((member) => (
                    <div key={member.id + '456'}>
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
              {/* {totalCount > updatedData?.length && (
                <LoadingButton
                  onClick={() => setPageSize((pre) => pre + 10)}
                  loading={isLoadingUser}
                  loadingPosition='start'
                  startIcon={'Loading'}
                  variant='outlined'>
                  <span>Load More</span>
                </LoadingButton>
              )} */}
            </Stack>
          </Box>
        )}
      </Stack>
    </div>
  );
};

export default MembersView;
