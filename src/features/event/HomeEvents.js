'use client'

import { fetchEvents } from '@/slices/eventSlice'
import { Box, Button, Stack } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardSkeleton from '../../../components/cardSkeleton'
import EventsCard from './EventsCard'

const HomeEvents = () => {
  const [event, setEvent] = useState()
  const { isLoading, events } = useSelector((state) => state.eventsReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  return (
    <div className='mt-9 text-center'>
      <h2 className='text-start font-semibold text-2xl mb-3'>
        আমাদের ইভেন্টসমূহ
      </h2>

      {isLoading ? (
        <CardSkeleton />
      ) : (
        <Box sx={{ boxShadow: 3 }} p={5} borderRadius={5}>
          {events && (
            <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 items-center'>
              {events.slice(0, 3)?.map((event) => (
                <div key={event.id}>
                  <EventsCard event={event} setEvent={setEvent}></EventsCard>
                </div>
              ))}
            </div>
          )}
          <Stack
            direction={'row'}
            gap={2}
            justifyContent={'end'}
            alignItems={'center'}
            my={5}>
            <Link href='/event' passHref>
              <Button variant='contained'>See All Events</Button>
            </Link>
          </Stack>
        </Box>
      )}
    </div>
  )
}

export default HomeEvents
