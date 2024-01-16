import AllUsersCard from '@/features/admin/components/dashboard/AllUsers/AllUsersCard';
import Pagination from '@/features/admin/components/dashboard/AllUsers/Pagination';
import FullLayout from '@/features/admin/layouts/FullLayout';
import { useGetUsersQuery } from '@/slices/api/apiSlice';
import { useGetBalanceQuery } from '@/slices/api/balanceApi';
import { Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useRef, useState } from 'react';
import theme from '../../features/admin/theme/theme';
import CardSkeleton from '../../../components/cardSkeleton';

const AllUsers = () => {
  const inputRef = useRef(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(90);

  // fetching user data
  const { data, isLoading: isLoadingUser } = useGetUsersQuery({
    page,
    pageSize,
  });
  const userData = data?.sortedDataMemberRole;
  const totalCount = data?.totalCount;

  const { data: balanceQuery } = useGetBalanceQuery();
  const balanceData = balanceQuery?.result;

  // Create an object to store the data and summation for all amount of a user
  const balance = {};
  // Iterate over the balanceData array
  if (balanceData) {
    for (const data of balanceData) {
      const memberId = data.memberId;
      const amount = data.amount;

      // Check if the memberId already exists in the balance object
      if (balance[memberId]) {
        // If it exists, add the amount to the existing total
        balance[memberId].amount += amount;
      } else {
        // If it doesn't exist, initialize the object with the data
        balance[memberId] = {
          memberName: data.memberName,
          amount: amount,
          memberId: memberId,
        };
      }
    }
  }

  // converting object to array
  const balanceArray = Object.values(balance);

  const updatedData = userData?.map((member) => {
    const balance = balanceArray?.find(
      (balanceMember) => balanceMember.memberId === +member.memberId
    );
    if (balance) {
      // console.log(balance)
      return {
        ...member,
        totalBalance: balance.amount,
      };
    } else
      return {
        ...member,
        totalBalance: 0,
      };
  });
  // console.log(data);

  const searchUser = updatedData?.filter((user) => {
    if (search === '') {
      return user;
    } else if (
      // user?.memberId.toLowerCase().includes(search.toLocaleLowerCase())
      user?.memberId.toString().includes(search.toString())
    ) {
      return user;
    }
  });

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
            id='searchName'
            className='p-2 rounded fs-4 mt-5 w-72 border-2'
            type='text'
            placeholder='Search'
            onChange={handleSearch}
          />
          <button
            id='searchName'
            className='btn btn-info btn-outline m-4 lg:ml-4'
            onClick={handleSearch}>
            Search
          </button>
        </div>
        <Grid
          container
          spacing={0}>
          <Grid
            item
            xs={12}
            lg={12}>
            {isLoadingUser ? (
              <CardSkeleton />
            ) : (
              <AllUsersCard
                searchUser={searchUser}
                page={page}
              />
            )}
            <Pagination
              setPageSize={setPageSize}
              pageSize={pageSize}
              totalCount={totalCount}
              setPage={setPage}
              searchUser={searchUser}
              page={page}></Pagination>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
};

export default AllUsers;
