import Head from "next/head";
import HomePage from "../../features/Home/HomePage";

const index = () => {
  return (
    <div className="max-w-[1240px] mx-auto my-10 ">
      <Head>
        <title>Home</title>
      </Head>
      <HomePage />
    </div>
  );
};

export default index;
