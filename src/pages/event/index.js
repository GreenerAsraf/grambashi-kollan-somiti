import EventView from "@/features/event/EventView";
import Head from "next/head";

const index = () => {
  return (
    <div className="max-w-[1240px] mx-auto">
      <Head>
        <title>Event</title>
      </Head>
      <h1 className=" my-10 text-center font-bold text-3xl">
        This is Event page
      </h1>
      <EventView></EventView>
    </div>
  );
};

export default index;
