import FullLayout from '@/features/admin/layouts/FullLayout';
import { useAddUserMutation } from '@/slices/api/apiSlice';
import { SendSharp } from '@mui/icons-material';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import { LoadingButton } from '@mui/lab';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
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
  Typography,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import AlertError from '../../../components/Alert/AlertError';
import AlertSuccess from '../../../components/Alert/AlertSuccess';
import BaseCard from '../../features/admin/components/baseCard/BaseCard';
import theme from '../../features/admin/theme/theme';

const AddNewUser = () => {
  const [img, setImg] = useState();
  const [loading, setLoading] = useState(false);
  const [addUser, { isLoading, isSuccess, isError, error }] =
    useAddUserMutation();

  const [userData, setUserData] = useState({
    memberRole: {
      id: '',
      role: '',
    },
    role: {
      id: '',
      role: '',
    },
  });

  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}>
        <CircularProgress color='inherit' />
      </Backdrop>
    );
  }

  // convert image to base64
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result;
        setImg(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const memberId = form.memberId.value;
    // const memberRule = form.memberRule.value
    // const role = form.role.value
    const name = form.name.value;
    const fatherName = form.fatherName.value;
    const motherName = form.motherName.value;
    const dateOfBirth = form.dateOfBirth.value;
    const mobile = form.mobile.value;
    const nomineeName = form.nomineeName.value;
    const nomineeMobile = form.nomineeMobile.value;
    const address = form.address.value;
    const gender = form.gender.value;
    const image =
      form.image.files[0] ||
      'https://www.aquasafemine.com/wp-content/uploads/2018/06/dummy-man-570x570.png';
    const formData = new FormData();

    formData?.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=2a7b5753b7c734244aec7cb118d7b8df`;
    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
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
            nomineeMobile: nomineeMobile,
            releaseStatus: 'false',
          };

          // console.log(formInfo);
          // user added using RTK query
          addUser(formInfo);
          setImg();
          setLoading(false);
          console.log(isSuccess, isError, error);
          if (error) {
            toast.error('Add new User Failed');
          }
          // form.reset()
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

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
    { id: 11, role: 'প্রচার সম্পাদক' },
  ];

  const subMemberList = [
    { id: 1, role: 'সাধারণ সদস্য' },
    { id: 2, role: 'কার্যকরী কমিটি' },
    { id: 3, role: 'উপদেষ্টা কমিটি' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        <Grid
          container
          spacing={0}>
          {isSuccess && (
            <AlertSuccess
              message={'User Added'}
              setOpen={true}
            />
          )}
          {error && <AlertError message={'Add new User Failed'} />}
          <Grid
            item
            xs={12}
            lg={12}>
            <BaseCard title='নতুন সদস্য ফর্ম'>
              <form onSubmit={(e) => handleSubmit(e)}>
                <Stack spacing={3}>
                  <InputLabel>সদস্য পদ</InputLabel>
                  <Select
                    onChange={(e) => {
                      const temp = userData;
                      const data = memberList.find(
                        (item) => item.id === parseInt(e.target.value)
                      );
                      setUserData({ ...temp, memberRole: data });
                    }}
                    name='memberRole'>
                    {memberList?.map(({ id, role }, i) => (
                      <MenuItem
                        key={i}
                        value={id}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                  <InputLabel>উপ-সদস্য পদ</InputLabel>
                  <Select
                    onChange={(e) => {
                      const temp = userData;
                      const data = subMemberList.find(
                        (item) => item.id === parseInt(e.target.value)
                      );
                      setUserData({ ...temp, role: data });
                    }}
                    name='role'>
                    {subMemberList?.map((ar, i) => (
                      <MenuItem
                        key={i}
                        value={ar.id}>
                        {ar.role}
                      </MenuItem>
                    ))}
                  </Select>

                  <TextField
                    required
                    name='name'
                    label='সদস্যের নাম'
                  />
                  <TextField
                    required
                    name='memberId'
                    type='number'
                    label='সদস্য নাম্বার (অবশ্যই নতুন নাম্বার দিতে হবে)'
                  />
                  <TextField
                    name='fatherName'
                    label='পিতার নাম'
                  />
                  <TextField
                    name='motherName'
                    label='মাতার নাম'
                  />
                  <TextField
                    name='dateOfBirth'
                    type='date'
                  />
                  <TextField
                    required
                    name='mobile'
                    type='number'
                    label='মোবাইল'
                  />
                  <TextField
                    name='address'
                    label='সদস্যের ঠিকানা'
                    multiline
                    rows={4}
                  />

                  <Stack
                    sx={{ boxShadow: 1 }}
                    gap={5}
                    p={5}
                    direction='row'
                    justifyContent={'space-between'}
                    spacing={2}>
                    <Box height={50}>
                      <Typography mb={2}> ছবি আপলোড</Typography>
                      <Button
                        variant='contained'
                        component='label'>
                        {/* <PhotoCameraIcon /> */}
                        <input
                          onChange={(e) => handleFileChange(e)}
                          name='image'
                          accept='image/*'
                          type='file'
                        />
                      </Button>
                    </Box>
                    <br />
                    <img
                      className=' w-60 h-56'
                      width={'100px'}
                      height={'100px'}
                      src={
                        img ||
                        'https://www.aquasafemine.com/wp-content/uploads/2018/06/dummy-man-570x570.png'
                      }
                      alt='profile'
                    />
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
                    label='নমিনির নাম '
                  />
                  <TextField
                    name='nomineeMobile'
                    type='number'
                    label='নমিনির মোবাইল '
                  />
                  <Stack
                    direction='row'
                    justifyContent='center'
                    divider={
                      <Divider
                        orientation='vertical'
                        flexItem
                      />
                    }
                    spacing={3}
                    alignItems='center'>
                    <Button
                      type='Reset'
                      variant='contained'
                      color='danger'
                      startIcon={<RestartAltOutlinedIcon color='#fff' />}>
                      <Typography color={'white'}>RESET</Typography>
                    </Button>

                    <LoadingButton
                      type='submit'
                      size='medium'
                      endIcon={<SendSharp />}
                      loading={loading}
                      loadingPosition='end'
                      variant='contained'
                      color='success'>
                      <span> SUBMIT</span>
                    </LoadingButton>
                  </Stack>
                </Stack>
              </form>
            </BaseCard>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
};
export default AddNewUser;
