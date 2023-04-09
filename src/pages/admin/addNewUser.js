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
  Typography
} from '@mui/material'
import BaseCard from '../../features/admin/components/baseCard/BaseCard'
import { ThemeProvider } from '@mui/material/styles'
import FullLayout from '@/features/admin/layouts/FullLayout'
import theme from '../../features/admin/theme/theme'
import axios from 'axios'
import { useEffect } from 'react'

const AddNewUser = () => {
  useEffect(() => {
    axios
      .get('http://localhost:5000/all-users')
      .then((data) => console.log(data))
      .catch((e) => {
        console.error('getting res error' + e)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const address = form.address.value
    const gender = form.gender.value
    const image = form.image.files[0]
    // const formData = new FormData()
    // formData.append('image', image)
    // console.log(formData)
    const formInfo = {
      name,
      address,
      gender
    }
    console.log(formInfo)

    fetch(`http://localhost:5000/add-user`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ formInfo: formInfo })
    })
      // axios
      //   .post(`http://localhost:5000/add-user`, formInfo)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((e) => console.error('add user failed', e.message))
  }

  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        <Grid container spacing={0}>
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
