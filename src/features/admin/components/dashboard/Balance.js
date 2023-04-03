import React from 'react'
import BaseCard from '../baseCard/BaseCard'
import {
  Box,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Stack
} from '@mui/material'
import { Button, Card, Typography } from '@material-tailwind/react'

const Balance = () => {
  return (
    <BaseCard>
      <Box>Balance</Box>

      <Box display={'flex'} padding={5} gap={'2rem'} boxShadow={'lg'}>
        <Box
          bgcolor={'#90EE90'}
          padding={5}
          width={345}
          // height={345}
          borderRadius={'5%'}
          sx={{
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
          }}>
          <Typography fontSize='xl' level='h1'>
            main
          </Typography>
        </Box>
        <Box
          bgcolor={'#87CEEB'}
          padding={5}
          // height={345}
          width={345}
          borderRadius={'5%'}
          sx={{
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
          }}>
          remaining
        </Box>
        <Box
          bgcolor={'#FFA500'}
          padding={5}
          height={200}
          width={345}
          borderRadius={'5%'}
          sx={{
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
          }}>
          remaining
        </Box>
      </Box>
    </BaseCard>
  )
}

export default Balance
