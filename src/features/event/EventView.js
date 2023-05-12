import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../slices/eventSlice";
import EventModal from "./EventModal";
import EventsCard from "./EventsCard";
import { useGetEventsQuery } from "@/slices/api/eventApi";

const EventView = () => {
  const [eventData, setEventData] = useState({});
  // const { isLoading, events, error } = useSelector(
  // 	(state) => state.eventsReducer
  // );
  // const dispatch = useDispatch();

  // useEffect(() => {
  // 	dispatch(fetchEvents());
  // }, [dispatch]);

  const { data, isLoading, isError } = useGetEventsQuery();

  return (
    <div className="text-center">
      {isLoading && <h1 className=" text-xl font-bold">Loading..........</h1>}
      {isError && <h1 className=" text-xl font-bold">Something Is Wrong</h1>}
      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 items-center">
          {data?.map((event) => (
            <div key={event._id}>
              <EventsCard
                event={event}
                setEventData={setEventData}
              ></EventsCard>
            </div>
          ))}
        </div>
      )}
      {eventData && <EventModal eventData={eventData}></EventModal>}
    </div>
  );
};

// export const getStaticProps = async () => {
//   const res = await dispatch(fetchEvents());
//   const data = res.json();

//   return {
//     props: {
//       events: data,
//     },
//   };
// };

export default EventView;
