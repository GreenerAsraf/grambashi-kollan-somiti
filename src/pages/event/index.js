import EventView from "@/features/event/EventView";
import Head from "next/head";

const index = () => {
  return (
    <div>
      <Head>
        <title>Event</title>
      </Head>
      <h1>This is Event page</h1>
      <EventView></EventView>
    </div>
  );
};

export default index;
