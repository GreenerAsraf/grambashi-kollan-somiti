import {
  Grid,
  Stack,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  Button,
  Typography,
} from "@mui/material";
import BaseCard from "../../features/admin/components/baseCard/BaseCard";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "@/features/admin/layouts/FullLayout";
import theme from "../../features/admin/theme/theme";
import { useAddEventMutation } from "@/slices/api/eventApi";
import Loading from "../../../components/Loading";

const AddNewEvent = () => {
  const [addEvent, { isLoading, isSuccess }] = useAddEventMutation();

  if (isLoading) {
    return <Loading />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const image = form.image.files[0];
    const formData = new FormData();
    formData.append("image", image);
    // console.log(formData)
    const url = `https://api.imgbb.com/1/upload?key=2a7b5753b7c734244aec7cb118d7b8df`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const formInfo = {
            eventName: form.name.value,
            description: form.description.value,
            image: result.data.url,
          };
          addEvent(formInfo);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <BaseCard title="নতুন ইভেন্ট ফর্ম">
              <form onSubmit={(e) => handleSubmit(e)}>
                <Stack spacing={3}>
                  <TextField
                    name="name"
                    id="name-basic"
                    label="ইভেন্টের নাম"
                    variant="outlined"
                  />
                  <TextField
                    name="description"
                    id="outlined-multiline-static"
                    label="ইভেন্টের বিবরণ"
                    multiline
                    rows={4}
                  />
                  <Stack direction="row" spacing={2}>
                    <Typography> ছবি আপলোড</Typography>
                    <Button variant="contained" component="label">
                      {/* <PhotoCameraIcon /> */}
                      <input name="image" accept="image/*" type="file" />
                    </Button>
                  </Stack>
                  <Button type="submit" variant="outlined" color="success">
                    Submit
                  </Button>
                </Stack>
              </form>
            </BaseCard>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
};

export default AddNewEvent;
