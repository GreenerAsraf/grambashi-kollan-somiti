import React from 'react'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
const Footer = () => {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '.5rem'
        }}>
        <Typography
          sx={{
            ':hover': {
              color: 'blue'
            }
          }}>
          <Link href='/'>আমরা গ্রামবাসী কল্যাণ সমিতি</Link>
        </Typography>
        © 2023 All rights reserved
      </Typography>
    </Box>
  )
}

export default Footer
