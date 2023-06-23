import { Grid } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import FullLayout from '@/features/admin/layouts/FullLayout'
import theme from '../../features/admin/theme/theme'
import Users from '@/features/admin/components/dashboard/AllUsers/AllUsersCard'
import AllUsersCard from '@/features/admin/components/dashboard/AllUsers/AllUsersCard'
import { useRef, useState } from 'react'
import { useGetUsersQuery } from '@/slices/api/apiSlice'

const AllUsers = () => {
  const inputRef = useRef(null);
  const { data, error, isLoading } = useGetUsersQuery();
  const [search, setSearch] = useState("");

  const searchUser = data?.filter((user) => {
    if (search === "") {
      return user;
    } else if (user.memberId.toLowerCase().includes(search.toLocaleLowerCase())) {
      return user;
    }
  });
  // console.log(searchUser);

  const handleSearch = (e) => {
    const searchData = inputRef.current.value;
    setSearch(searchData);
  };

  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
      <div className=' text-center lg:text-left pb-5'>
      <input
            ref={inputRef}
            id="searchName"
            className="p-2 rounded fs-4 mt-5 w-72 border-2"
            type="text"
            placeholder="Search"
          />
          <button
            id="searchName"
            className="btn btn-info btn-outline m-4 lg:ml-4"
            onClick={handleSearch}
          >
            Search
          </button>
      </div>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <AllUsersCard searchUser={searchUser} />
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  )
}

export default AllUsers
