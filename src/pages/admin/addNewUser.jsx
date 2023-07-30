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
  CircularProgress,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material'
import BaseCard from '../../features/admin/components/baseCard/BaseCard'
import { ThemeProvider } from '@mui/material/styles'
import FullLayout from '@/features/admin/layouts/FullLayout'
import theme from '../../features/admin/theme/theme'
import { useAddUserMutation } from '@/slices/api/apiSlice'
import AlertSuccess from '../../../components/Alert/AlertSuccess'
import { toast } from 'react-hot-toast'
import AlertError from '../../../components/Alert/AlertError'

const AddNewUser = () => {
  const [addUser, { isLoading, isSuccess, isError, error }] =
    useAddUserMutation()

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
    const memberId = form.memberId.value
    const memberRule = form.memberRule.value
    const role = form.role.value
    const name = form.name.value
    const fatherName = form.fatherName.value
    const motherName = form.motherName.value
    const dateOfBirth = form.dateOfBirth.value
    const mobile = form.mobile.value
    const nomineeName = form.nomineeName.value
    const nomineeMobile = form.nomineeMobile.value
    const address = form.address.value
    const gender = form.gender.value
    const image =
      form.image.files[0] ||
      'https://www.aquasafemine.com/wp-content/uploads/2018/06/dummy-man-570x570.png'
    const formData = new FormData()

    formData?.append('image', image)
    const url = `https://api.imgbb.com/1/upload?key=2a7b5753b7c734244aec7cb118d7b8df`
    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        if (result.success) {
          const formInfo = {
            memberId: memberId,
            memberRule: memberRule,
            role: role || 'সাধারণ সদস্য',
            name: name,
            fatherName: fatherName,
            motherName: motherName,
            image: result.data.url,
            mobile: mobile,
            dateOfBirth: dateOfBirth,
            address: address,
            gender: gender,
            nomineeName: nomineeName,
            nomineeMobile: nomineeMobile
          }

          // console.log(formInfo);
          // user added using RTK query
          addUser(formInfo)
          console.log(isSuccess, isError, error)
          if (error) {
            toast.error('Add new User Failed')
          }
          // form.reset()
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const array = [
    'সভাপতি',
    'চেয়ারম্যান',
    'ভাইস চেয়ারম্যান',
    'সহ সভাপতি',
    'সাধারণ-সম্পাদক',
    'সহ সাধারণ সম্পাদক',
    'অর্থ সম্পাদক',
    'সহ অর্থ সম্পাদক',
    'সাংগঠনিক সম্পাদক',
    'প্রবাসী কল্যাণ সম্পাদক',
    'প্রচার সম্পাদক'
  ]
  const array1 = ['সাধারণ সদস্য', 'কার্যকরী কমিটি', 'উপদেষ্টা কমিটি']

  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        <Grid container spacing={0}>
          {isSuccess && <AlertSuccess message={'User Added'} setOpen={true} />}
          {error && <AlertError message={'Add new User Failed'} />}
          <Grid item xs={12} lg={12}>
            <BaseCard title='নতুন সদস্য ফর্ম'>
              <form onSubmit={(e) => handleSubmit(e)}>
                <Stack spacing={3}>
                  <InputLabel>সদস্য পদ</InputLabel>
                  <Select
                    required
                    // color='#fff'
                    label='Age'
                    // labelId='demo-simple-select-label'
                    name='memberRule'>
                    {array.map((ar, i) => (
                      <MenuItem key={i} value={ar}>
                        {ar}
                      </MenuItem>
                    ))}
                  </Select>
                  <InputLabel>উপ-সদস্য পদ</InputLabel>
                  <Select name='role'>
                    {array1.map((ar, i) => (
                      <MenuItem key={i} value={ar}>
                        {ar}
                      </MenuItem>
                    ))}
                  </Select>

                  <TextField required name='name' label='সদস্যের নাম' />
                  <TextField
                    required
                    name='memberId'
                    type='number'
                    label='সদস্য নাম্বার (অবশ্যই নতুন নাম্বার দিতে হবে)'
                  />
                  <TextField required name='fatherName' label='পিতার নাম' />
                  <TextField required name='motherName' label='মাতার নাম' />
                  <TextField required name='dateOfBirth' type='date' />
                  <TextField
                    required
                    name='mobile'
                    type='number'
                    label='মোবাইল'
                  />
                  <TextField
                    required
                    name='address'
                    label='সদস্যের ঠিকানা'
                    multiline
                    rows={4}
                  />
                  <Stack direction='row' spacing={2}>
                    <Typography> ছবি আপলোড</Typography>
                    <Button variant='contained' component='label'>
                      {/* <PhotoCameraIcon /> */}
                      <input
                        required
                        name='image'
                        accept='image/*'
                        type='file'
                      />
                    </Button>
                  </Stack>
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
                  <TextField required name='nomineeName' label='নমিনির নাম ' />
                  <TextField
                    required
                    name='nomineeMobile'
                    type='number'
                    label='নমিনির মোবাইল '
                  />
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
