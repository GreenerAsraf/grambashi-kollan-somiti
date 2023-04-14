import React from 'react';
import Image from 'next/image';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

const MembersCard = ({ member }) => {
	const handleModal = (member) => {
		setMember(member);
	};

	return (
		<Grid container>
			{/* <membersCards member={member} setMember={setMember} /> */}
			{/* {blogs.map((member, index) => ( */}
			<Grid
				item
				xs={12}
				lg={10}
				sx={{
					display: 'flex',
					alignItems: 'center',
				}}>
				<Card
					sx={{
						p: 0,
						width: '100%',
					}}>
					{/* <Image src={blogs[1].img} alt='img' /> */}
					{/* <figure> */}
					<Image
						className='w-[600px] h-[330px]'
						src={member.image}
						width={'600'}
						height={'200'}
						unoptimized={true}
						alt={member.title}
					/>
					{/* </figure> */}
					<CardContent
						sx={{
							paddingLeft: '30px',
							paddingRight: '30px',
						}}>
						<Typography
							fontWeight='bold'
							sx={{
								fontSize: '24px',
								fontWeight: '500',
							}}>
							{member.name}
						</Typography>
						<Typography
							color='textSecondary'
							sx={{
								fontSize: '16px',
								fontWeight: '400',
								mt: 1,
							}}>
							{member.title}
						</Typography>
						{/* <Button
							variant='contained'
							sx={{
								mt: '15px',
							}}
							color={'primary'}>
							<label
								htmlFor='my-modal-3'
								onClick={() => handleModal(member)}
								className='btn btn-ghost'>
								See Details
							</label>
						</Button> */}
					</CardContent>
				</Card>
			</Grid>
			{/* ))} */}
		</Grid>
	);
};

export default MembersCard;
