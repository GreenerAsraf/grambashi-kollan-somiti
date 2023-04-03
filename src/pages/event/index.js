import EventView from '@/features/event/EventView'
import Head from 'next/head'
import TopBar from '../../../components/Navbar/Navbar'

const index = () => {
  return (
    <div className='max-w-[1240px] mx-auto '>
      <Head>
        <title>Event</title>
      </Head>
      <div>
        <TopBar />
        <h1 className=' my-10 text-center font-bold text-3xl'>
          This is Event page
        </h1>
        <EventView></EventView>
      </div>
    </div>
  )
}

export default index
