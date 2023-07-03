import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers } from '../../slices/membersSlice';
import MembersCard from './MembersCard';
import { useGetUsersQuery } from '@/slices/api/apiSlice';
import { Box, Stack } from '@mui/material';

const MembersView = () => {
	const [visible, setVisible] = useState(3);
	const [btn, setBtn] = useState(false);
	const { isLoading, members, error } = useSelector(
		(state) => state.membersReducer
	);
	const dispatch = useDispatch();
	const { data } = useGetUsersQuery();

	useEffect(() => {
		dispatch(fetchMembers());
	}, [dispatch]);

	console.log(data);

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
					{data && (
						<div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 items-center '>
							{data
								.filter(
									(f) =>
										f.memberRule === 'সভাপতি' || f.memberRule === 'সেক্রটারি'
								)
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
					{data && (
						<div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 items-center '>
							{data
								.filter(
									(f) =>
										// condition need to change
										f.memberRule === 'সভাপতি' || f.memberRule === 'সেক্রটারি'
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

			<button
				onClick={showAll}
				className='mt-10 btn btn-primary'
				disabled={btn}>
				Show All
			</button>
		</div>
	);
};

export default MembersView;
