import Image from "next/image";
import React from "react";

const EventModal = ({ eventData }) => {
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <Image src={eventData?.image} width={600} height={600} alt="/" />
          <h3 className="text-lg font-bold mt-4">{eventData?.eventName}</h3>
          <p className="py-4">{eventData?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
