import { ThemeProvider } from '@mui/material/styles'
import FullLayout from '@/features/admin/layouts/FullLayout'
import theme from '../../features/admin/theme/theme'

import React from 'react'

const Expenses = () => {
  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        <div>all expenses history</div>
      </FullLayout>
    </ThemeProvider>
  )
}

export default Expenses
