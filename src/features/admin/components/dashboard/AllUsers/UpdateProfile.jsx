import { useUpdateUserMutation } from '@/slices/api/apiSlice';
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
  Typography,
} from '@mui/material';
import BaseCard from '../../baseCard/BaseCard';
// import AlertSuccess from "../.";
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Loading from '../../../../../../components/Loading';
import Image from 'next/image';

const UpdateProfile = ({ user }) => {
  const [img, setImg] = useState();
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
    image: currentImage,
    _id,
  } = user;

  const [updateUser, { isLoading, isSuccess, isError }] =
    useUpdateUserMutation();
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

  useEffect(() => {
    setUserData({
      memberRole: memberRole,
      role: role,
    });
  }, [user]);

  const handleSubmit = (e, isSuccess, isLoading) => {
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
    const image = img ? form.image.files[0] : currentImage;
    const formData = new FormData();

    formData?.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=2a7b5753b7c734244aec7cb118d7b8df`;

    // if user not choose new img, existing will be updated
    if (!img) {
      const formInfo = {
        memberId: memberId,
        memberRole: userData.memberRole,
        role: userData.role || 'সাধারণ সদস্য',
        name: name,
        fatherName: fatherName,
        motherName: motherName,
        image: currentImage,
        mobile: mobile,
        dateOfBirth: dateOfBirth,
        address: address,
        gender: gender,
        nomineeName: nomineeName,
        nomineeMobile: nomineeMobile,
      };
      console.log(formInfo);
      updateUser(formInfo);
    }
    // if user choose new img, new img will be upload
    else {
      fetch(url, {
        method: 'POST',
        body: formData,
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
              nomineeMobile: nomineeMobile,
            };

            // return console.log(formInfo)
            // user added using RTK query
            updateUser(formInfo);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    setImg();
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
    { id: 12, role: 'সদস্য' },
  ];

  const subMemberList = [
    { id: 1, role: 'সাধারণ সদস্য' },
    { id: 2, role: 'কার্যকরী কমিটি' },
    { id: 3, role: 'উপদেষ্টা কমিটি' },
  ];

  if (isLoading) {
    return <Loading />;
  }

  if (isSuccess) {
    toast.success('Updated');
  }

  return (
    <div>
      {/* The button to open modal */}
      <label
        htmlFor={memberId}
        disabled={user?.releaseStatus}
        className='btn btn-xs btn-outline btn-info'>
        edit
      </label>
      {/* Put this part before </body> tag */}
      <input
        type='checkbox'
        id={memberId}
        className='modal-toggle'
      />
      <div
        className='modal'
        role='dialog'>
        <div className='modal-box'>
          <Grid
            container
            spacing={0}>
            {/* {isSuccess && (
              <AlertSuccess message={"User Added"} setOpen={true} />
            )} */}
            <Grid
              item
              xs={12}
              lg={12}>
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
                        const temp = userData;
                        const data = memberList.find(
                          (item) => item.id === parseInt(e.target.value)
                        );
                        setUserData({ ...temp, memberRole: data });
                      }}
                      name='memberRole'
                      defaultValue={memberRole?.id}>
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
                      name='role'
                      defaultValue={role?.id}>
                      {subMemberList?.map((ar, i) => (
                        <MenuItem
                          key={i}
                          value={ar.id}>
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
                      defaultValue={dateOfBirth}
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
                    <Stack
                      direction='row'
                      spacing={2}>
                      <Typography> ছবি আপলোড</Typography>
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
                    </Stack>
                    <img
                      className='rounded-full float-left w-60 h-56'
                      width={'100px'}
                      height={'100px'}
                      src={img ? img : currentImage}
                      alt='profile'
                    />

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
                    <Button
                      type='submit'
                      variant='outlined'
                      color='success'>
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
  );
};

export default UpdateProfile;
