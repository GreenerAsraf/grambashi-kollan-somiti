import * as React from 'react'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineDot from '@mui/lab/TimelineDot'
import { useGetCreditQuery } from '@/slices/api/creditApi'
import { getDateOnly } from '../../../../../../components/getDateOnly'

const CreditHistory = (page) => {
  const { data: creditData } = useGetCreditQuery()
  const creditHist = creditData?.result
  // console.log(creditHist);
  console.log(page.page)

  return (
    <Timeline
      sx={{
        p: 0
      }}>
      {creditHist
        ?.slice(6 * (page.page - 1), page.page * 6)
        ?.map((activity, i) => (
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
