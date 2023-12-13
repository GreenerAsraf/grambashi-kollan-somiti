import React from 'react'
import Image from 'next/image'
import { Card, CardContent, Typography, Button, Grid } from '@mui/material'

const MembersCard = ({ member }) => {
  const handleModal = (member) => {
    setMember(member)
  }

  return (
    <Grid container className='flex justify-center'>
      <Grid
        item
        xs={12}
        lg={10}
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}>
        <Card
          sx={{
            p: 0,
            width: '100%'
          }}>
          <Image
            className='w-[250px] h-[250px] rounded-full p-5 mx-auto'
            src={member.image}
            width={'600'}
            height={'200'}
            alt={member.title}
          />
          {/* </figure> */}
          <CardContent
            sx={{
              paddingLeft: '30px',
              paddingRight: '30px'
            }}>
            <Typography
              sx={{
                fontSize: '24px',
                fontWeight: '600'
              }}>
              {member.name}
            </Typography>
            <Typography>{member.memberRole.role}</Typography>
            <span>Total Balance: </span>
            <p
              className={`inline text-start text-lg py-2 ${
                member?.totalBalance === 0 ? 'text-red-300' : 'text-green-300'
              }`}>
              {member?.totalBalance}
            </p>
            <Typography
              color='textSecondary'
              sx={{
                fontSize: '16px',
                fontWeight: '600',
                mt: 1
              }}>
              {member.title}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default MembersCard
