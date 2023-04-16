import React from 'react'

import { Card, CardContent, Box, Typography } from '@mui/material'

const BaseCard = (props) => {
  return (
    <Card style={{ backgroundColor: `${props?.cardBg ? props?.cardBg : ''} ` }}>
      <Box p={2} display='flex' alignItems='center'>
        <Typography
          fontWeight={'bold'}
          variant={props.variant ? props.variant : 'h4'}>
          {props.title}
        </Typography>
      </Box>
      <CardContent>{props.children}</CardContent>
    </Card>
  )
}

export default BaseCard
