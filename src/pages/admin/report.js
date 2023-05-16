import CreditHistory from '@/features/admin/components/dashboard/report/CreditHistory'
import CreditModalPdf from '@/features/admin/components/dashboard/report/CreditModalPdf'
import DebitHistory from '@/features/admin/components/dashboard/report/DebitHistory'
import FullLayout from '@/features/admin/layouts/FullLayout'
import { useGetCreditQuery } from '@/slices/api/creditApi'
import { useGetDebitQuery } from '@/slices/api/debitCreditApi'
import { Button, Grid, Stack } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import BaseCard from '../../features/admin/components/baseCard/BaseCard'
import theme from '../../features/admin/theme/theme'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const Report = () => {
  const { data: creditData } = useGetCreditQuery()
  const creditHist = creditData?.result
  const creditLnt = creditHist?.length
  console.log(creditHist)

  const { data: debitData } = useGetDebitQuery()
  const debitHist = debitData?.result
  const debitLnt = debitHist?.length

  let lnt = 0
  if (creditLnt > debitLnt) {
    lnt = parseInt(Math.ceil(creditLnt / 6))
  } else {
    lnt = parseInt(Math.ceil(debitLnt / 6))
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

  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        <Grid container spacing={0} columns={{ xs: 4, sm: 8, md: 16 }}>
          <Grid item lg={12}>
            <Button onClick={() => downloadCreditReport()}>
              Download Credit History
            </Button>
            {/* open modal */}
            {/* <CreditModalPdf /> */}
            <BaseCard title='Credit History'>
              <Stack spacing={2}>
                <CreditHistory />
              </Stack>
            </BaseCard>
          </Grid>
          <Grid item>
            <Button onClick={() => downloadDebitReport()}>
              Download Debit History
            </Button>
            <BaseCard title='Debit History'>
              <Stack spacing={2}>
                <DebitHistory />
              </Stack>
            </BaseCard>
          </Grid>
        </Grid>
        <div className='btn-group float-right'>
          <button className='btn'>1</button>
          <button className='btn btn-active'>2</button>
          <button className='btn'>3</button>
          <button className='btn'>4</button>
        </div>
      </FullLayout>
    </ThemeProvider>
  )
}

export default Report
