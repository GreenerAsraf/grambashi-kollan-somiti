import React from "react";
import Image from "next/image";
const Loader = () => {
  return (
    <div className="handle-preloader">
      <div className="animation-preloader">
        {/* <div className="spinner"></div> */}
        <div className="text-loading">
          <Image
            className="spinner"
            src={`/logo.png`}
            alt="logo"
            width="100"
            height="100"
          />
          <span
            data-text-preloader="আমরা গ্রামবাসী কল্যাণ সমিতি"
            className="letters-loading"
          >
            আমরা গ্রামবাসী কল্যাণ সমিতি
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
