import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMembers } from '../../slices/membersSlice'
import MembersCard from './MembersCard'
import { useGetUsersQuery } from '@/slices/api/apiSlice'

const MembersView = () => {
  const [visible, setVisible] = useState(3)
  const [btn, setBtn] = useState(false)
  const { isLoading, members, error } = useSelector(
    (state) => state.membersReducer
  )
  const dispatch = useDispatch()
  const { data } = useGetUsersQuery()
  // console.log(data[7].memberRule, 'membersview')
  useEffect(() => {
    dispatch(fetchMembers())
  }, [dispatch])

  // console.log(members);

  const showAll = () => {
    const visible = members.length
    setVisible(visible)
    setBtn(true)
  }

  return (
    <div className='text-center'>
      <h2 className='text-start font-semibold text-2xl mb-3'>
        <u>কমিটির সদস্যবৃন্দ:-</u>
      </h2>
      {isLoading && <h1 className=' text-xl font-bold'>Loading..........</h1>}
      {error && <h1 className=' text-xl font-bold'>{error}</h1>}
      {data && (
        <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 items-center '>
          {data.map((member) => (
            <div key={member.id}>
              {member.memberRule === 'সভাপতি' && (
                <MembersCard member={member}></MembersCard>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={showAll}
        className='mt-10 btn btn-primary'
        disabled={btn}>
        Show All
      </button>
    </div>
  )
}

export default MembersView
