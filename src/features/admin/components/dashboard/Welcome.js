import React from 'react'
import { Card, CardContent, Box, Typography } from '@mui/material'

const Welcome = () => {
  return (
    <Card style={{ backgroundColor: '#D8F2F0' }}>
      <Box p={2} display='flex' alignItems='center'>
        <Typography color={'black'} fontWeight={'bold'} variant='h4'>
          Welcome Message 👋
        </Typography>
      </Box>
      <CardContent>
        স্বাগতম ,আমরা গ্রামবাসী কল্যাণ সমিতি এডমিন ড্যাশবোর্ড
      </CardContent>
    </Card>
  )
}

export default Welcome
