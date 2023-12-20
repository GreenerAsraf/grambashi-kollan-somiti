import UsersView from '@/features/users/UsersView'
import { useGetUsersQuery } from '@/slices/api/apiSlice'
import { useGetBalanceQuery } from '@/slices/api/balanceApi'
import Head from 'next/head'
import { useRef, useState } from 'react'
import TopBar from '../../../components/Navbar/Navbar'

const index = () => {
  const inputRef = useRef(null)
  const [search, setSearch] = useState('')
  const [pageSize, setPageSize] = useState(50)
  const { data, isLoading } = useGetUsersQuery({
    page: 1,
    pageSize
  })
  const totalCount = data?.totalCount

  const { data: balanceQuery } = useGetBalanceQuery()
  const balanceData = balanceQuery?.result

  // Create an object to store the data and summation for all amount of a user
  const balance = {}
  // Iterate over the balanceData array
  if (balanceData) {
    for (const data of balanceData) {
      const memberId = data.memberId
      const amount = data.amount

      // Check if the memberId already exists in the balance object
      if (balance[memberId]) {
        // If it exists, add the amount to the existing total
        balance[memberId].amount += amount
      } else {
        // If it doesn't exist, initialize the object with the data
        balance[memberId] = {
          memberName: data.memberName,
          amount: amount,
          memberId: memberId
        }
      }
    }
  }

  // converting object to array
  const balanceArray = Object.values(balance)

  const updatedData = data?.sortedDataMemberRole?.map((member) => {
    const balance = balanceArray?.find(
      (balanceMember) => balanceMember.memberId === +member.memberId
    )
    if (balance) {
      // console.log(balance)
      return {
        ...member,
        totalBalance: balance.amount
      }
    } else
      return {
        ...member,
        totalBalance: 0
      }
  })

  const searchUser = updatedData?.filter((user) => {
    if (search === '') {
      return user
    } else if (
      user?.memberId.toLowerCase().includes(search.toLocaleLowerCase())
    ) {
      return user
    }
  })

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
        <UsersView
          pageSize={pageSize}
          setPageSize={setPageSize}
          isLoading={isLoading}
          totalCount={totalCount}
          searchUser={searchUser}></UsersView>
      </div>
    </div>
  )
}

export default index
