import FullLayout from '@/features/admin/layouts/FullLayout'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../features/admin/theme/theme'

import BaseCard from '@/features/admin/components/baseCard/BaseCard'
import { useAddNoticeMutation } from '@/slices/api/noticeApi'
import { Button, Stack, TextField } from '@mui/material'
import { toast } from 'react-hot-toast'

const Expenses = () => {
  // const { data } = useGetNoticeQuery()
  const [addNotice, { isSuccess }] = useAddNoticeMutation()

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const notice = form.notice.value
    // console.log(notice)
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
            <Stack>
              <TextField name='notice' label='Notice' variant='outlined' />

              <Button type='submit'>Save</Button>
            </Stack>
          </form>
        </BaseCard>
      </FullLayout>
    </ThemeProvider>
  )
}

export default Expenses
