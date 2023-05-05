import { Grid, ImageList, ImageListItem } from "@mui/material";
import BaseCard from "../../features/admin/components/baseCard/BaseCard";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "@/features/admin/layouts/FullLayout";
import theme from "../../features/admin/theme/theme";
import {
  useDeleteEventMutation,
  useGetEventsQuery,
} from "@/slices/api/eventApi";
import Loading from "../../../components/Loading";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    cols: 2,
  },
];
const AllEvents = () => {
  const { data, isLoading, isError } = useGetEventsQuery();
  const [deleteEvent, { isSuccess }] = useDeleteEventMutation();
  console.log(data);

  if (isLoading) {
    return <Loading />;
  }

  const handleEventDelete = (id) => {
    // console.log(id);
    deleteEvent(id);
  };

  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.map((event) => (
            <div
              key={event._id}
              className="card w-80 lg:w-96 bg-base-100 shadow-xl"
            >
              <figure>
                <img src={event?.image} alt="/" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {event.eventName}
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{event.description.slice(0, 200)} ....</p>
                <div className="card-actions justify-end">
                  <div
                    onClick={() => handleEventDelete(event._id)}
                    className="btn btn-sm btn-warning font-normal rounded-full"
                  >
                    Remove
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </FullLayout>
    </ThemeProvider>
  );
};

export default AllEvents;
