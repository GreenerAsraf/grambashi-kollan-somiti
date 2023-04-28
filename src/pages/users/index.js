import UsersView from '@/features/users/UsersView'
import React from 'react'
import TopBar from '../../../components/Navbar/Navbar'
import Head from 'next/head'

const index = () => {
  return (
    <div className='max-w-[1240px] mx-auto '>
      <Head>
        <title>Members</title>
      </Head>
      <div>
        <TopBar />
        <h1 className=' my-10 text-center font-bold text-3xl'>All Members</h1>
        <UsersView></UsersView>
      </div>
    </div>
  )
}

export default index
