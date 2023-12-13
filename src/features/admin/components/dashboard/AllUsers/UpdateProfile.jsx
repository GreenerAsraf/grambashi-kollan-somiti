import { useUpdateUserMutation } from '@/slices/api/apiSlice'
import {
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import BaseCard from '../../baseCard/BaseCard'
// import AlertSuccess from "../.";
import { toast } from 'react-hot-toast'
import Loading from '../../../../../../components/Loading'
import { useState } from 'react'
import { useEffect } from 'react'

const UpdateProfile = ({ user }) => {
  // const [openModal, setOpenModal] = useState(false);

  const {
    role,
    memberRole,
    address,
    memberId,
    name,
    dateOfBirth,
    fatherName,
    motherName,
    gender,
    mobile,
    nomineeMobile,
    nomineeName,
    _id
  } = user
  console.log(memberRole)

  const [updateUser, { isLoading, isSuccess, isError }] =
    useUpdateUserMutation()
  const [userData, setUserData] = useState({
    memberRole: {
      id: '',
      role: ''
    },
    role: {
      id: '',
      role: ''
    }
  })

  useEffect(() => {
    setUserData({
      memberRole: memberRole,
      role: role
    })
  }, [user])

  const handleSubmit = (e, isSuccess, isLoading) => {
    e.preventDefault()
    const form = e.target

    const memberId = form.memberId.value
    // const memberRule = form.memberRule.value
    // const role = form.role.value
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
        if (result.success) {
          const formInfo = {
            memberId: memberId,
            memberRole: userData.memberRole,
            role: userData.role || 'সাধারণ সদস্য',
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

          // return console.log(formInfo)
          // user added using RTK query
          updateUser(formInfo)
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const memberList = [
    { id: 1, role: 'সভাপতি' },
    { id: 2, role: 'চেয়ারম্যান' },
    { id: 3, role: 'ভাইস চেয়ারম্যান' },
    { id: 4, role: 'সহ সভাপতি' },
    { id: 5, role: 'সাধারণ-সম্পাদক' },
    { id: 6, role: 'সহ সাধারণ সম্পাদক' },
    { id: 7, role: 'অর্থ সম্পাদক' },
    { id: 8, role: 'সহ অর্থ সম্পাদক' },
    { id: 9, role: 'সাংগঠনিক সম্পাদক' },
    { id: 10, role: 'প্রবাসী কল্যাণ সম্পাদক' },
    { id: 11, role: 'প্রচার সম্পাদক' }
  ]

  const subMemberList = [
    { id: 1, role: 'সাধারণ সদস্য' },
    { id: 2, role: 'কার্যকরী কমিটি' },
    { id: 3, role: 'উপদেষ্টা কমিটি' }
  ]

  if (isLoading) {
    return <Loading />
  }

  if (isSuccess) {
    toast.success('Updated')
  }

  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor={memberId} className='btn btn-xs btn-outline btn-info'>
        edit
      </label>
      {/* Put this part before </body> tag */}
      <input type='checkbox' id={memberId} className='modal-toggle' />
      <div className='modal' role='dialog'>
        <div className='modal-box'>
          <Grid container spacing={0}>
            {/* {isSuccess && (
              <AlertSuccess message={"User Added"} setOpen={true} />
            )} */}
            <Grid item xs={12} lg={12}>
              <div className='modal-action'>
                <label
                  htmlFor={memberId}
                  className='btn btn-sm btn-outline btn-error'>
                  Close!
                </label>
              </div>
              <BaseCard title={name}>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <Stack spacing={3}>
                    <InputLabel>সদস্য পদ</InputLabel>
                    <Select
                      onChange={(e) => {
                        const temp = userData
                        const data = memberList.find(
                          (item) => item.id === parseInt(e.target.value)
                        )
                        setUserData({ ...temp, memberRole: data })
                      }}
                      name='memberRole'
                      defaultValue={memberRole}>
                      {memberList.map(({ id, role }, i) => (
                        <MenuItem key={i} value={id}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                    <InputLabel>উপ-সদস্য পদ</InputLabel>
                    <Select
                      onChange={(e) => {
                        const temp = userData
                        const data = subMemberList.find(
                          (item) => item.id === parseInt(e.target.value)
                        )
                        setUserData({ ...temp, role: data })
                      }}
                      name='role'
                      defaultValue={role}>
                      {subMemberList.map((ar, i) => (
                        <MenuItem key={i} value={ar.id}>
                          {ar.role}
                        </MenuItem>
                      ))}
                    </Select>
                    <TextField
                      name='name'
                      id='name-basic'
                      label='সদস্যের নাম'
                      defaultValue={name}
                      variant='outlined'
                    />
                    <TextField
                      name='memberId'
                      type='number'
                      id='name-basic'
                      label='সদস্য নাম্বার '
                      disabled
                      defaultValue={memberId}
                      variant='outlined'
                    />

                    <TextField
                      name='fatherName'
                      id='name-basic'
                      label='পিতার নাম'
                      defaultValue={fatherName}
                      variant='outlined'
                    />
                    <TextField
                      name='motherName'
                      id='name-basic'
                      label='মাতার নাম'
                      defaultValue={motherName}
                      variant='outlined'
                    />
                    <TextField
                      name='dateOfBirth'
                      type='date'
                      id='name-basic'
                      // label='জন্মতারিখ'
                      variant='outlined'
                    />
                    <TextField
                      name='mobile'
                      type='number'
                      id='name-basic'
                      label='মোবাইল'
                      defaultValue={mobile}
                      variant='outlined'
                    />
                    <TextField
                      name='address'
                      id='outlined-multiline-static'
                      label='সদস্যের ঠিকানা'
                      defaultValue={address}
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
                    <TextField
                      name='nomineeName'
                      id='name-basic'
                      label='নমিনির নাম '
                      defaultValue={nomineeName}
                      variant='outlined'
                    />
                    <TextField
                      name='nomineeMobile'
                      type='number'
                      id='name-basic'
                      label='নমিনির মোবাইল '
                      defaultValue={nomineeMobile}
                      variant='outlined'
                    />
                    <Button type='submit' variant='outlined' color='success'>
                      Submit
                    </Button>
                  </Stack>
                </form>
              </BaseCard>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile
