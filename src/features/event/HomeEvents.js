import { fetchEvents } from '@/slices/eventSlice';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventsCard from './EventsCard';
import EventModal from './EventModal';
import Link from 'next/link';

const HomeEvents = () => {
	const [event, setEvent] = useState({});
	const { isLoading, events, error } = useSelector(
		(state) => state.eventsReducer
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchEvents());
	}, [dispatch]);

	return (
		<div className='mt-9 text-center'>
			<h2 className='text-start font-semibold text-2xl mb-3'>
				<u>আমাদের ইভেন্টসমূহ:-</u>
			</h2>
			{isLoading && <h1 className=' text-xl font-bold'>Loading..........</h1>}
			{error && <h1 className=' text-xl font-bold'>{error}</h1>}
			{events && (
				<div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 items-center'>
					{events.slice(0, 3).map((event) => (
						<div key={event.id}>
							<EventsCard
								event={event}
								setEvent={setEvent}></EventsCard>
						</div>
					))}
				</div>
			)}
			<Link
				href='/event'
				passHref
				className='mt-10 btn btn-primary'>
				Show More
			</Link>
			<EventModal event={event}></EventModal>
		</div>
	);
};

export default HomeEvents;
