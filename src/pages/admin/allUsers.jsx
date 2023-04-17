import { Grid } from '@mui/material';
import AllUser from '../../features/admin/components/dashboard/AllUsers/AllUsers';
import { ThemeProvider } from '@mui/material/styles';
import FullLayout from '@/features/admin/layouts/FullLayout';
import theme from '../../features/admin/theme/theme';
import Users from '@/features/admin/components/dashboard/AllUsers/Users';

const AllUsers = () => {
	return (
		<ThemeProvider theme={theme}>
			<FullLayout>
				<Grid
					container
					spacing={0}>
					<Grid
						item
						xs={12}
						lg={12}>
						{/* <AllUser /> */}
						<Users></Users>
					</Grid>
				</Grid>
			</FullLayout>
		</ThemeProvider>
	);
};

export default AllUsers;
