import React, { useEffect, useState } from 'react'
import BaseCard from '../baseCard/BaseCard'
import { Box } from '@mui/material'
import { useGetBalanceQuery } from '@/slices/api/balanceApi'
import { useAddCreditMutation, useGetCreditQuery } from '@/slices/api/creditApi'
import {
  useAddDebitMutation,
  useGetDebitQuery
} from '@/slices/api/debitCreditApi'

const Balance = () => {
  const [addCredit, { isSuccess: creditSuccess }] = useAddCreditMutation()
  const [addDebit, { isSuccess: debitSuccess }] = useAddDebitMutation()

  const { data } = useGetBalanceQuery()
  const balance = data?.result
  // console.log(balance);

  // Main Balance
  let mainBalance = 0
  {
    balance?.map((amount) => {
      mainBalance = mainBalance + amount.amount
    })
  }

  // Remaining Balance
  let totalBalance = 0
  {
    balance?.map(
      (blnc) => (totalBalance = totalBalance + parseInt(blnc.amount))
    )
  }

  // Total Spent
  const { data: debit } = useGetDebitQuery()
  // console.log(debit.result);
  let totalSpent = 0
  {
    debit?.result?.map((dev) => {
      totalSpent = totalSpent + dev.debit
    })
  }

  {
    debit?.result?.map(
      (dr) => (totalBalance = totalBalance - parseInt(dr.debit))
    )
  }

  // Total Profit

  const { data: credit } = useGetCreditQuery()
  // console.log(credit)
  let totalProfit = 0
  {
    credit?.result?.map((cred) => {
      totalProfit = totalProfit + cred.credit
    })
  }

  {
    credit?.result?.map(
      (cred) => (totalBalance = totalBalance + parseInt(cred.credit))
    )
  }

  return (
    <BaseCard title={'Wallet'} variant={'h1'}>
      <Box
        display={'flex'}
        // flexDirection={{ base: 'column', md: 'row' }}
        flexWrap='wrap'
        padding={5}
        gap={'2rem'}
        boxShadow={'lg'}>
        {/* Main Balance */}
        <Box
          bgcolor={'#90EE90'}
          padding={4}
          width={255}
          height={255}
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
          <br />

          <h1 className='text-3xl font-semibold'>${mainBalance}</h1>
        </Box>
        {/* Remaining Balance */}
        <Box
          bgcolor={'#FFA500'}
          padding={4}
          width={255}
          height={255}
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
          <br />
          <h1 className='text-3xl font-semibold'>${totalBalance}</h1>
        </Box>
        {/* Total Profit */}
        <Box
          bgcolor={'#87CEEB'}
          padding={4}
          width={255}
          height={255}
          display={'flex'}
          flexDirection={'column'}
          borderRadius={'5%'}
          sx={{
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
          }}>
          <Box>
            <img
              height={65}
              width={65}
              src='https://cdn-icons-png.flaticon.com/512/4149/4149714.png'
            />
          </Box>
          <h1 className='text-xl font-semibold'>Total Profit</h1>
          <br />
          <h1 className='text-3xl font-semibold'>${totalProfit}</h1>
        </Box>
        {/* Total Spent */}
        <Box
          bgcolor={'#fa667d'}
          padding={4}
          width={255}
          height={255}
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
          <br />
          <h1 className='text-3xl font-semibold'>${totalSpent}</h1>
        </Box>
      </Box>
    </BaseCard>
  )
}

export default Balance
