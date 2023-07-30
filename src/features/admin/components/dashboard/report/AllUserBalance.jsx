import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { getDateOnly } from '../../../../../../components/getDateOnly'
import { useGetCreditQuery } from '@/slices/api/creditApi'
import {
  useGetBalanceQuery,
  useGetMonthlyBalanceQuery
} from '@/slices/api/balanceApi'

const AllUserBalance = () => {
  const { data: creditData } = useGetCreditQuery()
  const creditHist = creditData?.result
  const { data: balanceQuery } = useGetBalanceQuery()
  const { data } = useGetMonthlyBalanceQuery()
  const monthlyBalance = data?.result
  // console.log(monthlyBalance)
  const balanceData = balanceQuery?.result

  const date = new Date()
  const currentMonth = date.getMonth() + 1
  const year = date.getFullYear()

  const months = [
    '',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  // Create an object to store the data and summation for all amount of a user
  const balance = {}
  // Iterate over the balanceData array
  if (balanceData) {
    for (const data of balanceData) {
      const memberId = data.memberId
      const amount = data.amount

      // Check if the memberId already exists in the balance object
      if (balance[memberId]) {
        // If it exists, add the amount to the existing total
        balance[memberId].amount += amount
      } else {
        // If it doesn't exist, initialize the object with the data
        balance[memberId] = {
          memberName: data.memberName,
          amount: amount,
          memberId: memberId,
          updatedAt: getDateOnly(data.updatedAt)
        }
      }
    }
  }
  // converting object to array
  const balanceArray = Object.values(balance)
  // following code to display data as per month
  const [selectedMonthYear, setSelectedMonthYear] = useState(
    `${year + '-' + months[currentMonth]}`
  )

  const handleMonth = (event) => {
    setSelectedMonthYear(event.target.value)
  }

  let filteredData = monthlyBalance?.filter((item) => {
    const updatedAt = new Date(item.updatedAt)
    // console.log('updatedAt: ', updatedAt)
    const selectedMonth = Number(selectedMonthYear.substring(5, 7))
    const selectedYear = Number(selectedMonthYear.substring(0, 4))
    return (
      updatedAt.getMonth() + 1 === selectedMonth &&
      updatedAt.getFullYear() === selectedYear
    )
  })

  const updatedMonthlyBalance = filteredData?.map((balance) => {
    const matchingBalance = balanceArray?.find(
      (item) => item?.memberId === balance?.memberId
    )
    if (matchingBalance) {
      return {
        ...balance,
        date: getDateOnly(balance.updatedAt),
        total: matchingBalance?.amount || 0
      }
    }
    return balance
  })
  // summation of monthlyBalance
  const monthlySum = updatedMonthlyBalance?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0
  )
  console.log('updatedMonthlyBalance: ', updatedMonthlyBalance)
  // summation of user total balance

  let totalSum = updatedMonthlyBalance?.reduce((accumulator, currentValue) => {
    if (currentValue.total) {
      return accumulator + currentValue.total
    }
    return accumulator
  }, 0)
  console.log('totalSum: ', totalSum)
  // formatting summation
  const formatNumberWithCommas = (number) => {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  const totalMoneyForThisMonth = formatNumberWithCommas(monthlySum)
  totalSum = formatNumberWithCommas(totalSum)
  // console.log(totalMoneyForThisMonth.toLocaleString())

  // download balance pdf
  const balanceCol = [
    { title: 'Member ID', field: 'memberId' },
    { title: 'Date', field: 'date' },
    { title: 'Name', field: 'memberName' },
    { title: 'This month', field: 'amount' },
    { title: 'Total Balance', field: 'total' }
  ]

  const balanceRow = {
    memberName: 'Total',
    amount: totalMoneyForThisMonth,
    total: totalSum
  }
  const faka = {
    memberName: '',
    amount: '',
    total: ''
  }

  const downloadBalanceReport = () => {
    const doc = new jsPDF()
    doc.text(
      `Balance History - ${
        months[Number(selectedMonthYear.substring(5, 7))]
      } ${year}`,
      20,
      10
    )
    doc.autoTable({
      theme: 'grid',
      columns: balanceCol.map((col) => ({ ...col, dataKey: col.field })),
      // rows: balanceRow.map((row) => ({ ...row, dataKey: row.field })),
      body: [...updatedMonthlyBalance, faka, balanceRow]
    })
    doc.save(
      `Balance History -  ${
        months[Number(selectedMonthYear.substring(5, 7))]
      } ${year}.pdf`
    )
  }
  return (
    <Box>
      <Stack flexDirection={'row'} gap={3}>
        <Box width={'200px'}>
          <FormControl fullWidth>
            <InputLabel>Select Month</InputLabel>
            <Select onChange={(e) => handleMonth(e)}>
              {months.map((month, i) => (
                <MenuItem value={year + '-' + `${i}`}>{month}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button
          style={{ background: '#000', color: '#fff' }}
          variant='outlined'
          onClick={() => downloadBalanceReport()}>
          Download Balance History
        </Button>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color='textSecondary' variant='h6'>
                SL No
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color='textSecondary' variant='h6'>
                ID No
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color='textSecondary' variant='h6'>
                Date
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color='textSecondary' variant='h6'>
                Member Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color='textSecondary' variant='h6'>
                This Month
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color='textSecondary' variant='h6'>
                Total Balance
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData &&
            updatedMonthlyBalance?.map((data, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Typography>{i + 1}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{data?.memberId}</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize='15px' fontWeight='500'>
                    {getDateOnly(data?.updatedAt)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='h6' fontWeight='600'>
                    {data?.memberName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='h6'>{data?.amount}</Typography>
                </TableCell>{' '}
                <TableCell>
                  <Typography variant='h6'>{data?.total}</Typography>
                </TableCell>
              </TableRow>
            ))}
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell align='left'>{totalMoneyForThisMonth}</TableCell>
            <TableCell align='left'>{totalSum}</TableCell>
          </TableRow>

          {filteredData?.length === 0 && (
            <Typography mt={2}>
              No data found for {selectedMonthYear}{' '}
            </Typography>
          )}
        </TableBody>
      </Table>
    </Box>
  )
}

export default AllUserBalance
