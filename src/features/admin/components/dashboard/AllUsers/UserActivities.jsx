import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineDot from '@mui/lab/TimelineDot'
import { getDate } from '../../../../../../components/getDate'
import { getDateOnly } from '../../../../../../components/getDateOnly'
import { useGetBalanceQuery } from '@/slices/api/balanceApi'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function UserActivities({ name, memberId }) {
  const [open, setOpen] = React.useState(false)

  const { data: balance } = useGetBalanceQuery()
  // console.log(balance.result)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  // paymentInfo will contain if data is found by id matching
  const paymentInfo = balance?.result?.filter(
    (uid) => uid?.memberId === memberId
  )
  // console.log(memberId)

  return (
    <div>
      <Button onClick={handleClickOpen}>See Payment Activities</Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'>
        <DialogTitle fontWeight={'bold'} color={'green'} fontSize={19}>
          "{name}" Payment activities
        </DialogTitle>
        {paymentInfo?.length === 0 && (
          <DialogContent>No data found</DialogContent>
        )}
        {paymentInfo && (
          <DialogContent>
            <Timeline
              sx={{
                p: 0
              }}>
              {paymentInfo.map((activity) => (
                <TimelineItem key={activity._id}>
                  <TimelineOppositeContent
                    sx={{
                      fontSize: '12px',
                      fontWeight: '700',
                      flex: '0'
                    }}>
                    {getDateOnly(activity.createdAt)}
                    {/* {getDate(activity.createdAt)} */}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    {activity.amount > 0 ? (
                      <TimelineDot
                        variant='outlined'
                        sx={{
                          borderColor: 'success.main'
                        }}
                      />
                    ) : (
                      <TimelineDot
                        variant='outlined'
                        sx={{
                          borderColor: 'error.main'
                        }}
                      />
                    )}
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent
                    color='text.secondary'
                    sx={{
                      fontSize: '14px'
                    }}>
                    {activity.amount} tk
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </DialogContent>
        )}
        <DialogActions>
          <Button variant='outlined' color='error' onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
