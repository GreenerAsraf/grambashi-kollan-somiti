import Head from 'next/head';
import HomePage from '../../features/Home/HomePage';
import MembersView from '@/features/Members/MembersVIew';
import Message from '@/features/Message/Message';
import HomeEvents from '@/features/event/HomeEvents';

const index = () => {
	return (
		<div className='max-w-[1250px] mx-auto mb-10 '>
			<Head>
				<title>আমরা গ্রামবাসী কল্যাণ সমিতি</title>
			</Head>
			<HomePage />
			<MembersView></MembersView>
			<HomeEvents></HomeEvents>
			<Message></Message>
		</div>
	);
};

export default index;
