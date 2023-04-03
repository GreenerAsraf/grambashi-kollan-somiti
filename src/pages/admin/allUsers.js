import { Grid } from '@mui/material'
import ProductPerformance from '../../features/admin/components/dashboard/ProductPerformance'
import { ThemeProvider } from '@mui/material/styles'
import FullLayout from '@/features/admin/layouts/FullLayout'
import theme from '../../features/admin/theme/theme'

const AllUsers = () => {
  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <ProductPerformance />
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  )
}

export default AllUsers
