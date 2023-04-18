import { Alert } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import * as React from 'react'

export default function AlertSuccess({ setOpen, message }) {
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
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}>
        <Alert
          sx={{
            color: '#fff'
          }}
          variant='filled'
          severity='success'>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}
