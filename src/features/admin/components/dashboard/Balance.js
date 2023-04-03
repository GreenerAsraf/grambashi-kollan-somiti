import React from 'react'
import BaseCard from '../baseCard/BaseCard'
import { Box } from '@mui/material'

const Balance = () => {
  return (
    <BaseCard title={'Wallet'}>
      <Box display={'flex'} padding={5} gap={'2rem'} boxShadow={'lg'}>
        <Box
          bgcolor={'#90EE90'}
          padding={5}
          width={345}
          height={345}
          display={'flex'}
          flexDirection={'column'}
          borderRadius={'5%'}
          sx={{
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
          }}>
          <Box>
            <img src='https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/64/null/external-cash-delivery-xnimrodx-lineal-color-xnimrodx.png' />
          </Box>
          <h1 className='text-xl font-semibold'>Main Balance</h1>
          <h1 className='text-xl font-semibold'>$400</h1>
        </Box>
        <Box
          bgcolor={'#87CEEB'}
          padding={5}
          height={345}
          width={345}
          display={'flex'}
          flexDirection={'column'}
          borderRadius={'5%'}
          sx={{
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
          }}>
          <Box>
            <img src='https://img.icons8.com/external-nawicon-outline-color-nawicon/64/null/external-Calculator-economy-nawicon-outline-color-nawicon.png' />
          </Box>
          <h1 className='text-xl font-semibold'>Remaining Balance</h1>
          <h1 className='text-xl font-semibold'>$400</h1>
        </Box>
        <Box
          bgcolor={'#FFA500'}
          padding={5}
          height={345}
          width={345}
          display={'flex'}
          flexDirection={'column'}
          borderRadius={'5%'}
          sx={{
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
          }}>
          <Box>
            <img src='https://img.icons8.com/external-filled-outline-wichaiwi/64/null/external-cost-business-risks-filled-outline-wichaiwi.png' />
          </Box>
          <h1 className='text-xl font-semibold'>Total Spent</h1>
          <h1 className='text-xl font-semibold'>$400</h1>
        </Box>
      </Box>
    </BaseCard>
  )
}

export default Balance
