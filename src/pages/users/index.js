import UsersView from '@/features/users/UsersView'
import React, { useRef, useState } from 'react'
import TopBar from '../../../components/Navbar/Navbar'
import Head from 'next/head'
import { useGetUsersQuery } from '@/slices/api/apiSlice'
import { HiMagnifyingGlass } from 'react-icons/hi2'

const index = () => {
  const inputRef = useRef(null)
  const { data, error, isLoading } = useGetUsersQuery()
  const [search, setSearch] = useState('')

  const searchUser = data?.filter((user) => {
    if (search === '') {
      return user
    } else if (
      user.memberId.toLowerCase().includes(search.toLocaleLowerCase())
    ) {
      return user
    }
  })
  // console.log(searchUser);

  const handleSearch = (e) => {
    const searchData = inputRef.current.value
    setSearch(searchData)
  }

  return (
    <div className='max-w-[1240px] mx-auto '>
      <Head>
        <title>Members</title>
      </Head>
      <div>
        <TopBar />
        <div className=' my-10 text-center '>
          <h1 className='font-bold text-3xl'>All Members</h1>
          <input
            ref={inputRef}
            id='searchName'
            className='p-2 rounded fs-4 mt-5 w-72'
            type='text'
            placeholder='Search'
          />
          <button
            id='searchName'
            className='btn  btn-success m-4 lg:ml-4'
            onClick={handleSearch}>
            Search
          </button>
        </div>
        <UsersView searchUser={searchUser}></UsersView>
      </div>
    </div>
  )
}

export default index
