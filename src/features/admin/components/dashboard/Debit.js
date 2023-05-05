import React from 'react';
import BaseCard from '../baseCard/BaseCard';
import { Box, Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { useAddBalanceMutation } from '@/slices/api/balanceApi';

const Debit = () => {
	const [pValue, setTValue] = useState('');
	const [addBalance] = useAddBalanceMutation();

	// console.log(pValue);

	const handleProfitSubmit = (event) => {
		// console.log(event);
		const amount = event;
		const data = {
			amount,
		};
		console.log(data);
		// addBalance(data);
	};

	return (
		<BaseCard
			title={'Debit and Credit'}
			variant={'h1'}>
			<Box
				display={'flex'}
				padding={7}
				gap={'5rem'}
				boxShadow={'lg'}>
				<Box
					bgcolor={'#e6e6ed'}
					padding={5}
					height={245}
					width={345}
					display={'flex'}
					flexDirection={'column'}
					borderRadius={'10%'}
					sx={{
						boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
					}}>
					<h1 className='text-2xl font-semibold'>আয়</h1>
					<TextField
						inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
						onChange={(newValue) => setTValue(newValue.target.value)}
						id='margin-normal'
						margin='normal'
						type='number'
						label='Amount'
						variant='standard'
						value={pValue}
					/>
					<Button
						className='text-black font-semibold text-xl mt-3'
						variant='contained'
						color='primary'
						onClick={() => handleProfitSubmit(pValue)}
						endIcon={<SendIcon />}>
						Send
					</Button>
				</Box>
				<Box
					bgcolor={'#bdf294'}
					padding={5}
					width={345}
					height={245}
					display={'flex'}
					flexDirection={'column'}
					borderRadius={'10%'}
					sx={{
						boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
					}}>
					<h1 className='text-2xl font-semibold'>ব্যয়</h1>
					<TextField
						id='standard-basic'
						label='Expenses Details'
						variant='standard'
					/>{' '}
					<TextField
						inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
						id='margin-normal'
						margin='normal'
						type='number'
						label='Amount'
						variant='standard'
					/>{' '}
				</Box>
			</Box>
		</BaseCard>
	);
};

export default Debit;
