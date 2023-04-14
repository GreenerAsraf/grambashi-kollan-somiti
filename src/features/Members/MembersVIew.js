import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers } from '../../slices/membersSlice';
import MembersCard from './MembersCard';

const MembersView = () => {
	const [visible, setVisible] = useState(3);
	const [btn, setBtn] = useState(false);
	const { isLoading, members, error } = useSelector(
		(state) => state.membersReducer
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchMembers());
	}, [dispatch]);

	// console.log(members);

	const showAll = () => {
		const visible = members.length;
		setVisible(visible);
		setBtn(true);
	};

	return (
		<div className='text-center'>
			{isLoading && <h1 className=' text-xl font-bold'>Loading..........</h1>}
			{error && <h1 className=' text-xl font-bold'>{error}</h1>}
			{members && (
				<div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 items-center'>
					{members.slice(0, visible).map((member) => (
						<div key={member.id}>
							<MembersCard member={member}></MembersCard>
						</div>
					))}
				</div>
			)}
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
