import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../slices/eventSlice";

const EventView = () => {
  const { isLoading, events, error } = useSelector(
    (state) => state.eventsReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <h1 className=" text-xl font-bold">Loading..........</h1>}
      {error && <h1 className=" text-xl font-bold">{error}</h1>}
      {events &&
        events.map((event) => {
          return (
            <div key={event.id}>
              <div>
                <h1>{event.title}</h1>
              </div>
            </div>
          );
        })}
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
