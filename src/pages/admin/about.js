import * as React from 'react'
import { Grid, Button, Box, Card, CardContent, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import FullLayout from '@/features/admin/layouts/FullLayout'
import theme from '../../features/admin/theme/theme'

export default function About() {
  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        <Grid container spacing={0}>
          {/* ------------------------- row 1 ------------------------- */}
          <Grid item xs={12} lg={12}>
            <Card>
              <CardContent>
                <Typography variant='h4'>About Card</Typography>
                <Typography variant='body1'>
                  This impressive paella is a perfect party dish and a fun meal
                  to cook together with your guests. Add 1 cup of frozen peas
                  along with the mussels, if you like.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  )
}
