import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents } from '../../slices/eventSlice'
import EventModal from './EventModal'
import EventsCard from './EventsCard'

const EventView = () => {
  const [event, setEvent] = useState({})
  const { isLoading, events, error } = useSelector(
    (state) => state.eventsReducer
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  return (
    <div>
      {isLoading && <h1 className=' text-xl font-bold'>Loading..........</h1>}
      {error && <h1 className=' text-xl font-bold'>{error}</h1>}
      {events && (
        <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6'>
          {events.map((event) => (
            <div key={event.id}>
              <EventsCard event={event} setEvent={setEvent}></EventsCard>
            </div>
          ))}
        </div>
      )}
      <EventModal event={event}></EventModal>
    </div>
  )
}

// export const getStaticProps = async () => {
//   const res = await dispatch(fetchEvents());
//   const data = res.json();

//   return {
//     props: {
//       events: data,
//     },
//   };
// };

export default EventView
