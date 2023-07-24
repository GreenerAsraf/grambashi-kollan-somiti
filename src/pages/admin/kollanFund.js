import { Grid } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import BlogCard from '../../features/admin/components/dashboard/BlogCard'
import SalesOverview from '../../features/admin/components/dashboard/SalesOverview'
import DailyActivity from '../../features/admin/components/dashboard/DailyActivity'
import AllUsers from '../../features/admin/components/dashboard/AllUsers/AllUsers'
import FullLayout from '@/features/admin/layouts/FullLayout'
import theme from '../../features/admin/theme/theme'
import Balance from '@/features/admin/components/dashboard/Balance'
import Welcome from '@/features/admin/components/dashboard/Welcome'
import Debit from '@/features/admin/components/dashboard/Debit'
import BalanceKF from '@/features/admin/components/dashboard/KollanFund/BalanceKF'
import DebitKF from '@/features/admin/components/dashboard/KollanFund/DebitKF'

const kollanFund = () => {
  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <Welcome />
          </Grid>
          <Grid item xs={12} lg={12}>
            <BalanceKF />
          </Grid>
          <Grid item xs={12} lg={12}>
            <DebitKF />
          </Grid>

          {/* <Grid
          item
          xs={12}
          lg={12}
        >
          <SalesOverview />
        </Grid> */}
          {/* ------------------------- row 1 ------------------------- */}
          {/* <Grid
          item
          xs={12}
          lg={4}
        >
          <DailyActivity />
        </Grid> */}
          {/* <Grid item xs={12} lg={8}>
          <AllUsers />
        </Grid> */}
          {/* <Grid item xs={12} lg={12}>
          <BlogCard />
        </Grid> */}
        </Grid>
      </FullLayout>
    </ThemeProvider>
  )
}

export default kollanFund
