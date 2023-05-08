import * as React from 'react'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineDot from '@mui/lab/TimelineDot'
import { useGetCreditQuery } from '@/slices/api/creditApi'

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

const CreditHistory = () => {
  const { data: creditData } = useGetCreditQuery()
  const creditHist = creditData?.result
  // console.log(creditHist)

  return (
    <Timeline
      sx={{
        p: 0
      }}>
      {creditHist?.map((activity, i) => (
        <TimelineItem key={i}>
          <TimelineOppositeContent
            sx={{
              fontSize: '12px',
              fontWeight: '700',
              flex: '0'
            }}>
            Date
            {/* {activity.time} */}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot
              variant='outlined'
              sx={{
                borderColor: 'success.main'
              }}
            />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent
            color='text.secondary'
            sx={{
              fontSize: '14px'
            }}>
            {activity.creditNote} {activity.credit}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}

export default CreditHistory
