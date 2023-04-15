import Head from 'next/head';
import HomePage from '../../features/Home/HomePage';
import MembersView from '@/features/Members/MembersVIew';
import Message from '@/features/Message/Message';

const index = () => {
	return (
		<div className='max-w-[1240px] mx-auto my-10 '>
			<Head>
				<title>আমরা গ্রামবাসী কল্যাণ সমিতি</title>
			</Head>
			<HomePage />
			<MembersView></MembersView>
			<Message></Message>
		</div>
	);
};

export default index;
