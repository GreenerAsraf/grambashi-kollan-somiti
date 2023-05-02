import React from 'react'
import BaseCard from '../baseCard/BaseCard'
import { Box, Button, TextField } from '@mui/material'

const Debit = () => {
  const handleDebit = (e) => {
    e.preventDefault()
    const form = e.target
    const credit = form.credit.value
    console.log(credit)
  }
  const handleCredit = (e) => {
    e.preventDefault()
    const form = e.target
    const debit = form.debit.value
    const debitNote = form.debitNote.value
    const debitInfo = {
      debit,
      debitNote
    }
    console.log(debitInfo)
  }
  return (
    <BaseCard title={'Debit and Credit'} variant={'h1'}>
      <Box
        display={'flex'}
        justifyContent={'center'}
        gap={'5rem'}
        boxShadow={'lg'}>
        <form onSubmit={handleDebit}>
          <Box
            padding={5}
            height={290}
            width={345}
            display={'flex'}
            flexDirection={'column'}
            borderRadius={'10%'}
            sx={{
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
            }}>
            <h1 className='text-2xl font-semibold'>Credit</h1>
            <TextField
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              type='number'
              label='Amount'
              variant='standard'
              name='credit'
              margin='normal'
            />
            <Button type='submit'>Submit</Button>
          </Box>
        </form>

        <form onSubmit={handleCredit}>
          <Box
            padding={5}
            width={345}
            height={290}
            display={'flex'}
            flexDirection={'column'}
            borderRadius={'10%'}
            sx={{
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
            }}>
            <h1 className='text-2xl font-semibold'>Debit </h1>
            <TextField
              label='Expenses Note'
              variant='standard'
              name='debitNote'
              margin='normal'
              type='text'
            />
            <TextField
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              margin='normal'
              type='number'
              label='Amount'
              variant='standard'
              name='debit'
            />
            <Button type='submit'>Submit</Button>
          </Box>
        </form>
      </Box>
    </BaseCard>
  )
}

export default Debit
