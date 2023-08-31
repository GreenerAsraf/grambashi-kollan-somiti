import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers } from '../../slices/membersSlice';
import MembersCard from './MembersCard';
import { useGetUsersQuery } from '@/slices/api/apiSlice';
import { Box, Stack } from '@mui/material';
import { useGetBalanceQuery } from '@/slices/api/balanceApi';

const MembersView = () => {
	const [visible, setVisible] = useState(3);
	const [btn, setBtn] = useState(false);
	const { isLoading, members, error } = useSelector(
		(state) => state.membersReducer
	);
	const dispatch = useDispatch();
	const { data } = useGetUsersQuery();

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
	// console.log('balanceArray: ', balanceArray)
	// console.log('data: ', data)

	const updatedData = data?.map((member) => {
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

	const showAll = () => {
		const visible = members.length;
		setVisible(visible);
		setBtn(true);
	};

	return (
		<div className='text-center'>
			{isLoading && <h1 className=' text-xl font-bold'>Loading..........</h1>}
			{error && <h1 className=' text-xl font-bold'>{error}</h1>}
			{/* কার্যকরী কমিটির সদস্যবৃন্দ */}
			<Stack gap={5}>
				<Box>
					<h2 className='text-start font-semibold text-2xl mb-3'>
						<u>কার্যকরী কমিটির সদস্যবৃন্দ:-</u>
					</h2>
					{updatedData && (
						<div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 items-center '>
							{updatedData
								.filter((f) => f.role === 'কার্যকরী কমিটি')
								.map((member) => (
									<div key={member.id}>
										<MembersCard member={member}></MembersCard>
									</div>
								))}
						</div>
					)}
				</Box>
				{/* উপদেষ্টা কমিটির সদস্যবৃন্দ */}
				<Box>
					<h2 className='text-start font-semibold text-2xl mb-3'>
						<u>উপদেষ্টা কমিটির সদস্যবৃন্দ:-</u>
					</h2>
					{updatedData && (
						<div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 items-center '>
							{updatedData
								.filter(
									(f) =>
										// condition need to change
										f.role === 'উপদেষ্টা কমিটি'
								)
								.map((member) => (
									<div key={member.id}>
										<MembersCard member={member}></MembersCard>
									</div>
								))}
						</div>
					)}
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
	);
};

export default MembersView;
