import FullLayout from '@/features/admin/layouts/FullLayout'
import { useAddUserMutation } from '@/slices/api/apiSlice'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import AlertSuccess from '../../../components/Alert/AlertSuccess'
import Loading from '../../../components/Loading'
import BaseCard from '../../features/admin/components/baseCard/BaseCard'
import theme from '../../features/admin/theme/theme'

const AddNewUser = () => {
  const [addUser, { isLoading, isSuccess, isError }] = useAddUserMutation()

  if (isLoading) {
    return <Loading />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const address = form.address.value
    const gender = form.gender.value
    const image = form.image.files[0]
    const formData = new FormData()
    formData.append('image', image)
    const formInfo = {
      name: name,
      address: address,
      gender: gender
    }

    // console.log(formInfo)
    // user added using RTK query
    addUser(formInfo)
    form.reset()
  }

  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        <Grid container spacing={0}>
          {isSuccess && <AlertSuccess message={'User Added'} setOpen={true} />}
          <Grid item xs={12} lg={12}>
            <BaseCard title='নতুন সদস্য ফর্ম'>
              <form onSubmit={(e) => handleSubmit(e)}>
                <Stack spacing={3}>
                  <TextField
                    name='name'
                    id='name-basic'
                    label='সদস্যের নাম'
                    variant='outlined'
                  />
                  <TextField
                    name='address'
                    id='outlined-multiline-static'
                    label='সদস্যের ঠিকানা'
                    multiline
                    rows={4}
                  />
                  <Stack direction='row' spacing={2}>
                    <Typography> ছবি আপলোড</Typography>
                    <Button variant='contained' component='label'>
                      {/* <PhotoCameraIcon /> */}
                      <input name='image' accept='image/*' type='file' />
                    </Button>
                  </Stack>
                  <FormControl>
                    <FormLabel id='gender'>Gender</FormLabel>
                    <RadioGroup
                      aria-labelledby='gender'
                      defaultValue='পুরুষ'
                      name='gender'>
                      <FormControlLabel
                        value='পুরুষ'
                        control={<Radio />}
                        label='পুরুষ'
                      />
                      <FormControlLabel
                        value='মহিলা'
                        control={<Radio />}
                        label='মহিলা'
                      />
                      <FormControlLabel
                        value='other'
                        control={<Radio />}
                        label='Other'
                      />
                    </RadioGroup>
                  </FormControl>
                  <Button type='submit' variant='outlined' color='success'>
                    Submit
                  </Button>
                </Stack>
              </form>
            </BaseCard>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  )
}

export default AddNewUser
