import React from 'react'
import BaseCard from '../baseCard/BaseCard'
import { Box, Button, TextField } from '@mui/material'
import { useAddDebitMutation } from '@/slices/api/debitCreditApi'
import { toast } from 'react-hot-toast'
import { useAddCreditMutation } from '@/slices/api/creditApi'

const Debit = () => {
  const [addCredit, { isSuccess: creditSuccess }] = useAddCreditMutation()
  const [addDebit, { isSuccess: debitSuccess }] = useAddDebitMutation()

  const handleCredit = (e) => {
    e.preventDefault()
    const form = e.target
    const credit = form.credit.value
    const creditNote = form.creditNote.value
    const creditInfo = { credit, creditNote }
    console.log(creditInfo)
    addCredit(creditInfo)
  }

  const handleDebit = (e) => {
    e.preventDefault()
    const form = e.target
    const debit = form.debit.value
    const debitNote = form.debitNote.value
    const debitInfo = {
      debit,
      debitNote
    }
    console.log(debitInfo)
    addDebit(debitInfo)
  }

  // console.log(creditSuccess, debitSuccess)

  if (creditSuccess) {
    toast.success('Credit Added!')
  }
  if (debitSuccess) {
    toast.success('Debit Added!')
  }

  return (
    <BaseCard title={'Debit and Credit'} variant={'h1'}>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        justifyContent={'center'}
        gap={'5rem'}
        boxShadow={'lg'}>
        <div>
          <form onSubmit={handleCredit}>
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
                label='Credit Note'
                variant='standard'
                name='creditNote'
                margin='normal'
                type='text'
              />
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
        </div>

        <div>
          <form onSubmit={handleDebit}>
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
        </div>
      </Box>
    </BaseCard>
  )
}

export default Debit
