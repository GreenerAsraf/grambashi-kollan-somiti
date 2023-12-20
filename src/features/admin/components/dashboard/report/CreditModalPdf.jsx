import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useGetCreditQuery } from '@/slices/api/creditApi'
import { getDateOnly } from '../../../../../../components/getDateOnly'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function CreditModalPdf() {
  const [open, setOpen] = React.useState(false)
  const { data: creditData } = useGetCreditQuery()
  const creditHist = creditData?.result

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const CreditRef = useRef()
  const DebitRef = useRef()
  const tableRef = useRef()

  const downloadPDF = useReactToPrint({
    content: () => tableRef.current,
    documentTitle: 'test hist',
    onAfterPrint: () => alert('pdf Downloaded')
  })

  return (
    <Box m={1}>
      <Button variant='outlined' onClick={handleClickOpen}>
        Download Credit Report
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'>
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            {' '}
            <Button onClick={downloadPDF}>Download pdf</Button>
            <Box
              ref={tableRef}
              // style={{ display: 'none' }}
              mt={5}>
              <Typography variant='h3'>Credit History</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography color='textSecondary' variant='h6'>
                        SL No
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color='textSecondary' variant='h6'>
                        Date
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color='textSecondary' variant='h6'>
                        Credit Note
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color='textSecondary' variant='h6'>
                        Credit
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {creditHist?.map((user, i) => (
                    <TableRow key={user?._id}>
                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: '15px',
                            fontWeight: '500'
                          }}>
                          {i + 1}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontSize='15px' fontWeight='500'>
                          {getDateOnly(user?.createdAt)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='h6' fontWeight='600'>
                          {user?.creditNote}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='h6'>{user?.credit}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
