import { useGetUsersQuery } from '@/features/api/apiSlice';
import React from 'react';
import DeleteDialogue from './DeleteDialogue';

const Users = () => {
	const { data } = useGetUsersQuery();
	const [agree, setAgree] = React.useState(false);
	// console.log(data);

	const handleSubmit = (event) => {
		event.preventDefault();
		const amount = event.target.amount.value;
		console.log(amount);
	};

	return (
		<div className='grid lg:grid-cols-3 md:grid-cols-2 gap-7'>
			{data?.map((user) => (
				<div className='card card-compact w-[360px] bg-base-100 shadow-2xl p-2'>
					<div className='card-body'>
						<div className='flex justify-between'>
							<img
								src={user.image}
								alt='profile'
							/>
							<DeleteDialogue
								id={user._id}
								agree={agree}
								setAgree={setAgree}></DeleteDialogue>
						</div>
						<h2 className='text-start text-lg'>{user.name}</h2>
						<p>{user.address}</p>
						<form
							onSubmit={handleSubmit}
							className='flex justify-between mt-3'>
							<input
								type='number'
								placeholder='amount'
								name='amount'
								className='input input-bordered'
							/>
							<button
								type='submit'
								className='btn btn-info btn-outline'>
								add
							</button>
						</form>
					</div>
				</div>
			))}
		</div>
	);
};

export default Users;
