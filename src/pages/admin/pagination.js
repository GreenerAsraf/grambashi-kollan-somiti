import { Grid, Pagination, Stack } from '@mui/material'
import BaseCard from '../../features/admin/components/baseCard/BaseCard'
import { ThemeProvider } from '@mui/material/styles'
import FullLayout from '@/features/admin/layouts/FullLayout'
import theme from '../../features/admin/theme/theme'

const Paginations = () => {
  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <BaseCard title='Paginations'>
              <Stack spacing={2}>
                <Pagination count={10} />
                <Pagination count={10} color='primary' />
                <Pagination count={10} color='secondary' />
                <Pagination count={10} disabled />
              </Stack>
            </BaseCard>
          </Grid>
          <Grid item xs={12} lg={12}>
            <BaseCard title='Outlined Paginations'>
              <Stack spacing={2}>
                <Pagination count={10} variant='outlined' />
                <Pagination count={10} variant='outlined' color='primary' />
                <Pagination count={10} variant='outlined' color='secondary' />
                <Pagination count={10} variant='outlined' disabled />
              </Stack>
            </BaseCard>
          </Grid>
          <Grid item xs={12} lg={12}>
            <BaseCard title='Squred Paginations'>
              <Stack spacing={2}>
                <Pagination count={10} shape='rounded' variant='outlined' />
                <Pagination
                  count={10}
                  shape='rounded'
                  variant='outlined'
                  color='primary'
                />
                <Pagination
                  count={10}
                  shape='rounded'
                  variant='outlined'
                  color='secondary'
                />
                <Pagination
                  count={10}
                  shape='rounded'
                  variant='outlined'
                  disabled
                />
              </Stack>
            </BaseCard>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  )
}

export default Paginations
