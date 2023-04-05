import React from "react";
import { useGetUsersQuery } from "../api/apiSlice";

const UsersView = () => {
  const { data, error, isLoading } = useGetUsersQuery();

  //   if (isLoading) {
  //     return <p>Loading......</p>;
  //   }
  //   if (error) {
  //     return <p>{error.message}</p>;
  //   }
  return (
    <div>
      {isLoading && <h1 className=" text-xl font-bold">Loading..........</h1>}
      {error && <h1 className=" text-xl font-bold">{error.message}</h1>}
      {data?.map((user) => (
        <div key={user.id}>
          <h1>Data</h1>
        </div>
      ))}
    </div>
  );
};

export default UsersView;
