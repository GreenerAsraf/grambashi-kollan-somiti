import FullLayout from '@/features/admin/layouts/FullLayout'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../features/admin/theme/theme'

import BaseCard from '@/features/admin/components/baseCard/BaseCard'
import { useAddNoticeMutation, useGetNoticeQuery } from '@/slices/api/noticeApi'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { toast } from 'react-hot-toast'

const Expenses = () => {
  const { data, isLoading } = useGetNoticeQuery()
  const [addNotice, { isSuccess }] = useAddNoticeMutation()

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const notice = form.notice.value

    addNotice({ notice })
  }
  if (isSuccess) {
    toast.success('Notice added')
  }
  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        <BaseCard title={'Add notice here'}>
          <form onSubmit={handleSubmit}>
            <Stack mt={3}>
              Notice preview
              <Typography mb={3} textAlign={'center'} color={'green'}>
                {!isLoading && `${data[0]?.notice}`}
              </Typography>
              <TextField
                name='notice'
                label='New Notice'
                placeholder='Write here new Notice'
                variant='outlined'
              />
              <Button type='submit'>Update</Button>
            </Stack>
          </form>
        </BaseCard>
      </FullLayout>
    </ThemeProvider>
  )
}

export default Expenses
