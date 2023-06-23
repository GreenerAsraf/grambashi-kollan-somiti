import CreditHistory from '@/features/admin/components/dashboard/report/CreditHistory'
import DebitHistory from '@/features/admin/components/dashboard/report/DebitHistory'
import FullLayout from '@/features/admin/layouts/FullLayout'
import { useGetCreditQuery } from '@/slices/api/creditApi'
import { useGetDebitQuery } from '@/slices/api/debitCreditApi'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack
} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useState } from 'react'
import BaseCard from '../../features/admin/components/baseCard/BaseCard'
import theme from '../../features/admin/theme/theme'
import { styled } from '@mui/material/styles'
import {
  HiArrowRightCircle,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  IconName
} from 'react-icons/hi2'
import CreditModalPdf from '@/features/admin/components/dashboard/report/CreditModalPdf'
import AllUserBalance from '@/features/admin/components/dashboard/report/AllUserBalance'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#99E2C2',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  borderRadius: 20,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  flexGrow: 1
}))

const Report = () => {
  const [page, setPage] = useState(1)
  const [pre, setPre] = useState(0)
  const [next, setNext] = useState(5)
  const [btn, setBtn] = useState(false)
  const { data: creditData } = useGetCreditQuery()
  const creditHist = creditData?.result
  const creditLnt = creditHist?.length
  // console.log(creditHist);
  // console.log(pre, next)

  const { data: debitData } = useGetDebitQuery()
  const debitHist = debitData?.result
  const debitLnt = debitHist?.length

  let lnt = 0
  if (creditLnt > debitLnt) {
    lnt = parseInt(Math.ceil(creditLnt / 6))
  } else {
    lnt = parseInt(Math.ceil(debitLnt / 6))
  }

  const arr = []
  for (let i = 1; i <= lnt; i++) {
    arr.push(i)
  }
  const pagination = (e) => {
    setPage(e)
  }

  const disableBtn = () => {
    if (pre === 1 || next === lnt) {
      setBtn(true)
    }
  }

  const prevBtn = () => {
    if (pre > 0) {
      setPre(pre - 1)
      setNext(next - 1)
    }
  }
  const nextBtn = () => {
    setPre(pre + 1)
    setNext(next + 1)
  }

  const creditCol = [
    { title: 'Date', field: 'createdAt' },
    { title: 'Credit (tk)', field: 'credit' },
    { title: 'CreditNote', field: 'creditNote' }
    // { title: 'Year', field: 'year', type: 'numeric' },
    // { title: 'Fee', field: 'fee', type: 'currency' }
  ]
  const debitCol = [
    { title: 'Date', field: 'createdAt' },
    { title: 'Debit (tk)', field: 'debit' },
    { title: 'DebitNote', field: 'debitNote' }
    // { title: 'Year', field: 'year', type: 'numeric' },
    // { title: 'Fee', field: 'fee', type: 'currency' }
  ]

  const downloadCreditReport = () => {
    const doc = new jsPDF()
    doc.text('Credit History', 20, 10)
    doc.autoTable({
      theme: 'grid',
      columns: creditCol.map((col) => ({ ...col, dataKey: col.field })),
      body: creditHist
    })
    doc.save('Credit History.pdf')
  }

  const downloadDebitReport = () => {
    const doc = new jsPDF()
    doc.text('Debit History', 20, 10)
    doc.autoTable({
      theme: 'grid',
      columns: debitCol.map((col) => ({ ...col, dataKey: col.field })),
      body: debitHist
    })
    doc.save('Debit History.pdf')
  }

  const months = [
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

  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        <BaseCard title='User Balance' variant='h3'>
          <AllUserBalance />
        </BaseCard>
        <Stack
          my={5}
          spacing={{ xs: 1, sm: 2 }}
          direction='row'
          useFlexGap
          flexWrap='wrap'>
          <Item>
            <Button
              style={{ background: '#000', color: '#fff', marginTop: '10px' }}
              variant='outlined'
              onClick={() => downloadCreditReport()}>
              Download Credit History
            </Button>
            {/* open modal */}
            {/* <CreditModalPdf /> */}
            <BaseCard title='Credit History'>
              <Stack spacing={2}>
                <CreditHistory page={page} />
              </Stack>
            </BaseCard>
          </Item>
          <Item>
            <Button
              style={{ background: '#000', color: '#fff', marginTop: '10px' }}
              variant='outlined'
              onClick={() => downloadDebitReport()}>
              Download Debit History
            </Button>
            <BaseCard title='Debit History'>
              <Stack spacing={2}>
                <DebitHistory page={page} />
              </Stack>
            </BaseCard>
          </Item>
        </Stack>
        <div className='btn-group gap-3 flex justify-center'>
          <button
            className=' btn-outline btn-success'
            onClick={() => prevBtn()}>
            <HiChevronDoubleLeft />
          </button>
          {arr.slice(pre, next).map((ar) => (
            <button
              onClick={() => pagination(ar)}
              className={
                ar === page
                  ? ' btn-success btn-circle'
                  : ' btn-outline btn-circle'
              }>
              {ar}
            </button>
          ))}
          {/* <HiArrowRightCircle onClick={() => nextBtn()} /> */}
          <button
            className=' btn-outline btn-success'
            onClick={() => nextBtn()}>
            <HiChevronDoubleRight />
          </button>
        </div>
      </FullLayout>
    </ThemeProvider>
  )
}

export default Report
