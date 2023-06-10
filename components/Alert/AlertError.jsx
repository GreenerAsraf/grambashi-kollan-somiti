import { Alert, Typography } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import * as React from 'react'

export default function AlertError({ setOpen, message }) {
  const [state, setState] = React.useState({
    open: { setOpen },
    vertical: 'top',
    horizontal: 'center'
  })
  const { vertical, horizontal, open } = state

  const handleClose = () => {
    setState({ ...state, open: false })
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={6000}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}>
        <Alert variant='filled' severity='error'>
          <Typography color={'white'}>{message}!</Typography>
        </Alert>
      </Snackbar>
    </div>
  )
}
