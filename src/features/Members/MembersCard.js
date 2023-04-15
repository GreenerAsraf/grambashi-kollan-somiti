import React from 'react';
import Image from 'next/image';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

const MembersCard = ({ member }) => {
	const handleModal = (member) => {
		setMember(member);
	};

	return (
		<Grid container>
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
					<Image
						className='w-[400px] h-[250px] rounded-full'
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
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

export default MembersCard;