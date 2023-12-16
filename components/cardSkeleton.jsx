import { Box, Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'

const CardSkeleton = () => {
  return (
    <Box sx={{ boxShadow: 3 }} p={5} borderRadius={5}>
      <Stack mb={2} justifyContent={'space-between'} direction={'row'} gap={5}>
        <Stack
          bgcolor={'white'}
          p={5}
          borderRadius={5}
          gap={1}
          alignItems={'center'}>
          <Skeleton variant='circular' width={200} height={200} />
          <br />
          <Skeleton variant='rectangular' width={250} height={50} />
          <Skeleton variant='rounded' width={250} height={20} />
          <Skeleton variant='rounded' width={250} height={20} />
        </Stack>
        <Stack
          bgcolor={'white'}
          p={5}
          borderRadius={5}
          gap={1}
          alignItems={'center'}>
          <Skeleton variant='circular' width={200} height={200} />
          <br />
          <Skeleton variant='rectangular' width={250} height={50} />
          <Skeleton variant='rounded' width={250} height={20} />
          <Skeleton variant='rounded' width={250} height={20} />
        </Stack>
        <Stack
          bgcolor={'white'}
          p={5}
          borderRadius={5}
          gap={1}
          alignItems={'center'}>
          <Skeleton variant='circular' width={200} height={200} />
          <br />
          <Skeleton variant='rectangular' width={250} height={50} />
          <Skeleton variant='rounded' width={250} height={20} />
          <Skeleton variant='rounded' width={250} height={20} />
        </Stack>
      </Stack>
      <Typography textAlign={'right'}>Loading...</Typography>
    </Box>
  )
}

export default CardSkeleton
