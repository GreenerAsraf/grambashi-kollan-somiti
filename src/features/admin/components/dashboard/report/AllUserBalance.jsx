import {
  useGetBalanceQuery,
  useGetMonthlyBalanceQuery
} from '@/slices/api/balanceApi'
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
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useState, useEffect } from 'react'
import { getDateOnly } from '../../../../../../components/getDateOnly'

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

const AllUserBalance = () => {
  const date = new Date()
  const currentMonth = date.getMonth()
  const [month, setMonth] = useState(months[currentMonth])
  const [currentYear, setYear] = useState(date.getFullYear())
  const selectedMonthYear = `${month + '-' + currentYear}`

  const { data: monthlyBalanceQuery } = useGetMonthlyBalanceQuery({
    month: month,
    year: currentYear
  })
  // console.log('monthlyBalanceQuery: ', monthlyBalanceQuery?.result)

  // Generate a list of years for the past 5 years
  const pastYears = Array.from(
    { length: 1 },
    (_, index) => currentYear - index - 1
  )

  // Generate a list of years for the next 5 years
  const futureYears = Array.from(
    { length: 1 },
    (_, index) => currentYear + index + 1
  )

  // Combine the past and future years
  const allYears = [...pastYears.reverse(), currentYear, ...futureYears]

  // summation of monthlyBalance
  let monthlySum = monthlyBalanceQuery?.result?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0
  )

  // summation of user total balance
  let totalSum = monthlyBalanceQuery?.result?.reduce(
    (accumulator, currentValue) => {
      if (currentValue.total) {
        return accumulator + currentValue.total
      }
      return accumulator
    },
    0
  )

  // formatting summation
  const formatNumberWithCommas = (number) => {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  monthlySum = formatNumberWithCommas(monthlySum)
  totalSum = formatNumberWithCommas(totalSum)

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
    amount: 100 || 'totalMoneyForThisMonth',
    total: 10 || 'totalSum'
  }
  const faka = {
    memberName: '',
    amount: '',
    total: ''
  }

  const downloadBalanceReport = () => {
    const doc = new jsPDF()
    doc.text(`Balance History ${selectedMonthYear}`, 20, 10)
    doc.autoTable({
      theme: 'grid',
      columns: balanceCol?.map((col) => ({ ...col, dataKey: col.field })),
      // rows: balanceRow.map((row) => ({ ...row, dataKey: row.field })),
      body: [...monthlyBalanceQuery?.result, faka, balanceRow]
    })
    doc.save(`Balance History -${selectedMonthYear}.pdf`)
  }

  return (
    <Box>
      <Stack flexDirection={'row'} gap={3} flexWrap={'wrap'}>
        <Stack minWidth={'25%'} flexDirection={'row'} gap={2} width={'200px'}>
          <FormControl fullWidth>
            <InputLabel>Select Year</InputLabel>
            <Select
              defaultValue={currentYear}
              onChange={(e) => setYear(e.target.value)}>
              {allYears?.map((yearItem, i) => (
                <MenuItem key={i} value={yearItem}>
                  {yearItem}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Select Month</InputLabel>
            <Select
              defaultValue={months[0]}
              onChange={(e) => setMonth(e.target.value)}>
              {months?.map((month, i) => (
                <MenuItem defaultValue={month} key={i} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
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
          {monthlyBalanceQuery?.result?.map((data, i) => (
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
            <TableCell align='left'>{monthlySum}</TableCell>
            <TableCell align='left'>{totalSum}</TableCell>
          </TableRow>

          {monthlyBalanceQuery?.result?.length === 0 && (
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
