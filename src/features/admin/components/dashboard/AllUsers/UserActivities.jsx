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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const activities = [
  {
    time: '09.50',
    color: 'success.main',
    text: 'Meeting with John'
  },
  {
    time: '09.46',
    color: 'secondary.main',
    text: 'Payment received from John Doe of $385.90'
  },
  {
    time: '09.47',
    color: 'primary.main',
    text: 'Project Meeting'
  },
  {
    time: '09.48',
    color: 'warning.main',
    text: 'New Sale recorded #ML-3467'
  },
  {
    time: '09.49',
    color: 'error.main',
    text: 'Payment was made of $64.95 to Michael Anderson'
  }
]

export default function UserActivities({ name, id }) {
  const [open, setOpen] = React.useState(false)

  const [balance, setBalance] = React.useState([])

  React.useEffect(() => {
    fetch('http://localhost:5000/total-balance')
      .then((res) => res.json())
      .then((data) => {
        setBalance(data)
      })
      .catch((e) => console.error(e))
  }, [])

  // console.log(balance)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

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
        <DialogContent>
          <Timeline
            sx={{
              p: 0
            }}>
            {balance
              .filter((uid) => uid.id === id)
              .map((activity) => (
                <TimelineItem key={activity.time}>
                  <TimelineOppositeContent
                    sx={{
                      fontSize: '12px',
                      fontWeight: '700',
                      flex: '0'
                    }}>
                    {activity.createdAt}
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
        <DialogActions>
          <Button variant='outlined' color='error' onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
