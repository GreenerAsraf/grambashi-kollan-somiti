import Image from "next/image";
import React from "react";

const EventsCard = ({ event, setEvent }) => {
  const handleModal = (event) => {
    setEvent(event);
  };
  return (
    <div className="card w-96 bg-base-100 shadow-xl hover:image-full">
      <figure>
        <Image src={event.image} alt="Shoes" fill></Image>
      </figure>
      <div className="card-body hero-overlay">
        <h2 className="card-title">{event.title}</h2>
        <p>{event.description.slice(0, 70)} . . . .</p>
        <div className="card-actions justify-end">
          <label
            htmlFor="my-modal-3"
            onClick={() => handleModal(event)}
            className="btn btn-ghost"
          >
            See Details
          </label>
        </div>
      </div>
    </div>
  );
};

export default EventsCard;
