import { Grid, Alert, Stack, AlertTitle } from '@mui/material'
import BaseCard from '../../features/admin/components/baseCard/BaseCard'
import { ThemeProvider } from '@mui/material/styles'
import FullLayout from '@/features/admin/layouts/FullLayout'
import theme from '../../features/admin/theme/theme'
import CreditHistory from '@/features/admin/components/dashboard/report/CreditHistory'
import DebitHistory from '@/features/admin/components/dashboard/report/DebitHistory'

const Report = () => {
  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        <Grid container spacing={0} columns={{ xs: 4, sm: 8, md: 16 }}>
          <Grid item lg={12}>
            <BaseCard title='Credit History'>
              <Stack spacing={2}>
                <CreditHistory />
              </Stack>
            </BaseCard>
          </Grid>
          <Grid item>
            <BaseCard title='Debit History'>
              <Stack spacing={2}>
                <DebitHistory />
              </Stack>
            </BaseCard>
          </Grid>
          <Grid item>
            <BaseCard title='Alert with Desc'>
              <Stack spacing={2}>
                <Alert severity='error'>
                  <AlertTitle>Error</AlertTitle>
                  This is an error alert — <strong>check it out!</strong>
                </Alert>
                <Alert severity='warning'>
                  <AlertTitle>Warning</AlertTitle>
                  This is a warning alert — <strong>check it out!</strong>
                </Alert>
                <Alert severity='info'>
                  <AlertTitle>Info</AlertTitle>
                  This is an info alert — <strong>check it out!</strong>
                </Alert>
                <Alert severity='success'>
                  <AlertTitle>Success</AlertTitle>
                  This is a success alert — <strong>check it out!</strong>
                </Alert>
              </Stack>
            </BaseCard>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  )
}

export default Report
