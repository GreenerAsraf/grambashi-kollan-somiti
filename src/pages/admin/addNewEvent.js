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

const AddNewEvent = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const image = form.image.files[0];
    const formData = new FormData();
    formData.append("image", image);
    // console.log(formData)
    const formInfo = {
      name: form.name.value,
      address: form.address.value,
      gender: form.gender.value,
    };
    console.log(formInfo);
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
                    name="address"
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
