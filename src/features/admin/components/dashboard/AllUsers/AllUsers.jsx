import React from 'react'
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Button
} from '@mui/material'
import BaseCard from '../../baseCard/BaseCard'
import { useGetUsersQuery } from '@/slices/api/apiSlice'
import DeleteDialogue from './DeleteDialogue'

const AllUsers = () => {
  const { data, isLoading } = useGetUsersQuery()
  console.log(data)
  const [agree, setAgree] = React.useState(false)

  return (
    <BaseCard title='Users List'>
      <Table
        aria-label='simple table'
        sx={{
          mt: 3,
          whiteSpace: 'nowrap'
        }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color='textSecondary' variant='h6'>
                Id
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color='textSecondary' variant='h6'>
                Name
              </Typography>
            </TableCell>

            <TableCell>
              <Typography color='textSecondary' variant='h6'>
                Account
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color='textSecondary' variant='h6'>
                Action
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: '15px',
                    fontWeight: '500'
                  }}>
                  {user?.memberId}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                  <Box>
                    <Typography
                      variant='h6'
                      sx={{
                        fontWeight: '600'
                      }}>
                      {user.name}
                    </Typography>
                    <Typography
                      color='textSecondary'
                      sx={{
                        fontSize: '13px'
                      }}>
                      {user.address}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant='h6'>$24.5k</Typography>
              </TableCell>
              <TableCell>
                <DeleteDialogue
                  id={user.memberId}
                  agree={agree}
                  setAgree={setAgree}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
  )
}

export default AllUsers
