import Image from 'next/image';
import React from 'react';

// const EventsCards = ({ event, setEvent }) => {
//   const handleModal = (event) => {
//     setEvent(event)
//   }
//   return (
//     <div className='card w-96 bg-base-100 shadow-xl hover:image-full'>
//       <figure>
//         <Image src={event.image} alt='Shoes' fill></Image>
//       </figure>
//       <div className='card-body hero-overlay'>
//         <h2 className='card-title'>{event.title}</h2>
//         <p>{event.description.slice(0, 70)} . . . .</p>
//         <div className='card-actions justify-end'>
//           <label
//             htmlFor='my-modal-3'
//             onClick={() => handleModal(event)}
//             className='btn btn-ghost'>
//             See Details
//           </label>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default EventsCard;

// import React from 'react'
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
// import Image from 'next/image'
import user1 from '../../../assets/images/backgrounds/u2.jpg';
import user2 from '../../../assets/images/backgrounds/u3.jpg';
import user3 from '../../../assets/images/backgrounds/u4.jpg';

const blogs = [
	{
		img: user1,
		title: 'Super awesome, Angular 12 is coming soon!',
		subtitle:
			"Some quick example text to build on the card title and make up the bulk of the card's content.",
		btncolor: 'error',
	},
	{
		img: user2,
		title: 'Super awesome, Angular 12 is coming soon!',
		subtitle:
			"Some quick example text to build on the card title and make up the bulk of the card's content.",
		btncolor: 'warning',
	},
	{
		img: user3,
		title: 'Super awesome, Angular 12 is coming soon!',
		subtitle:
			"Some quick example text to build on the card title and make up the bulk of the card's content.",
		btncolor: 'primary',
	},
];

const EventsCard = ({ event, setEvent }) => {
	const handleModal = (event) => {
		setEvent(event);
	};

	return (
		<Grid
			container
			className='flex justify-center'>
			{/* <EventsCards event={event} setEvent={setEvent} /> */}
			{/* {blogs.map((event, index) => ( */}
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
						src={event.image}
						width={'624'}
						height={'417'}
						alt={event.title}
					/>
					{/* </figure> */}
					<CardContent
						sx={{
							paddingLeft: '30px',
							paddingRight: '30px',
						}}>
						<Typography
							className='text-start'
							sx={{
								fontSize: 'h4.fontSize',
								fontWeight: '500',
							}}>
							{event.title}
						</Typography>
						<Typography
							className='text-start'
							color='textSecondary'
							sx={{
								fontSize: '14px',
								fontWeight: '400',
								mt: 1,
							}}>
							{event.title}
						</Typography>
						<Button
							variant='contained'
							sx={{
								mt: '15px',
							}}
							color={'primary'}>
							<label
								htmlFor='my-modal-3'
								onClick={() => handleModal(event)}
								className='btn btn-ghost '>
								See Details
							</label>
						</Button>
					</CardContent>
				</Card>
			</Grid>
			{/* ))} */}
		</Grid>
	);
};

export default EventsCard;
