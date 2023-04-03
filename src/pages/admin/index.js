import { Grid } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import BlogCard from '../../features/admin/components/dashboard/BlogCard'
import SalesOverview from '../../features/admin/components/dashboard/SalesOverview'
import DailyActivity from '../../features/admin/components/dashboard/DailyActivity'
import ProductPerformance from '../../features/admin/components/dashboard/ProductPerformance'
import FullLayout from '@/features/admin/layouts/FullLayout'
import theme from '../../features/admin/theme/theme'
import Balance from '@/features/admin/components/dashboard/Balance'

export default function Index() {
  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <Balance />
          </Grid>
          <Grid item xs={12} lg={12}>
            <SalesOverview />
          </Grid>
          {/* ------------------------- row 1 ------------------------- */}
          <Grid item xs={12} lg={4}>
            <DailyActivity />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          {/* <Grid item xs={12} lg={12}>
            <BlogCard />
          </Grid> */}
        </Grid>
      </FullLayout>
    </ThemeProvider>
  )
}
