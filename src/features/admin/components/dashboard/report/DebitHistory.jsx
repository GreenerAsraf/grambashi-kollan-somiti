import * as React from 'react'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineDot from '@mui/lab/TimelineDot'
import { useGetCreditQuery } from '@/slices/api/creditApi'
import { useGetDebitQuery } from '@/slices/api/debitCreditApi'
import { getDateOnly } from '../../../../../../components/getDateOnly'

const DebitHistory = () => {
  const { data: debitData } = useGetDebitQuery()
  const debitHist = debitData?.result
  // console.log(debitHist)

  return (
    <Timeline
      sx={{
        p: 0
      }}>
      {debitHist?.slice(0, 6).map((activity, i) => (
        <TimelineItem key={i}>
          <TimelineOppositeContent
            sx={{
              fontSize: '12px',
              fontWeight: '700',
              flex: '0'
            }}>
            {getDateOnly(activity.createdAt)}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot
              variant='outlined'
              sx={{
                borderColor: 'error.main'
              }}
            />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent
            color='text.secondary'
            sx={{
              fontSize: '14px'
            }}>
            {activity.debitNote} {activity.debit}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}

export default DebitHistory
