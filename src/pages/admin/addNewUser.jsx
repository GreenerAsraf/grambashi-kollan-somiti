import React from 'react'
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
  Alert,
  Snackbar,
  Backdrop,
  CircularProgress
} from '@mui/material'
import BaseCard from '../../features/admin/components/baseCard/BaseCard'
import { ThemeProvider } from '@mui/material/styles'
import FullLayout from '@/features/admin/layouts/FullLayout'
import theme from '../../features/admin/theme/theme'
import { useAddUserMutation } from '@/features/api/apiSlice'

const AddNewUser = () => {
  const [addUser, { isLoading, isSuccess, isError }] = useAddUserMutation()

  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}>
        <CircularProgress color='inherit' />
      </Backdrop>
    )
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
          {isSuccess && (
            <Snackbar open={true} message='User added'>
              <Alert variant='filled' severity='success'>
                <Typography color={'white'}>User Added</Typography>
              </Alert>
            </Snackbar>
          )}
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
