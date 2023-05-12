import { Grid, Alert, Stack, AlertTitle } from '@mui/material';
import BaseCard from '../../features/admin/components/baseCard/BaseCard';
import { ThemeProvider } from '@mui/material/styles';
import FullLayout from '@/features/admin/layouts/FullLayout';
import theme from '../../features/admin/theme/theme';
import CreditHistory from '@/features/admin/components/dashboard/report/CreditHistory';
import DebitHistory from '@/features/admin/components/dashboard/report/DebitHistory';
import ReactPDF, { PDFDownloadLink } from '@react-pdf/renderer';
import CreditPdf from '@/features/admin/components/dashboard/report/CreditPdf';
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import { useGetCreditQuery } from '@/slices/api/creditApi';
import { useGetDebitQuery } from '@/slices/api/debitCreditApi';

const Report = () => {
	const { data: creditData } = useGetCreditQuery();
	const creditHist = creditData?.result;
	const creditLnt = creditHist?.length;
	// console.log(creditLnt);

	const { data: debitData } = useGetDebitQuery();
	const debitHist = debitData?.result;
	const debitLnt = debitHist?.length;
	let lnt = 0;
	if (creditLnt > debitLnt) {
		lnt = parseInt(Math.ceil(creditLnt / 6));
	} else {
		lnt = parseInt(Math.ceil(debitLnt / 6));
	}
	// console.log(lnt);

	const CreditRef = useRef();
	const DebitRef = useRef();
	return (
		<ThemeProvider theme={theme}>
			<FullLayout>
				<Grid
					container
					spacing={0}
					columns={{ xs: 4, sm: 8, md: 16 }}>
					<Grid
						item
						lg={12}>
						<ReactToPrint
							trigger={() => (
								<button className='btn-sm btn-primary'>
									Download Credit Report
								</button>
							)}
							content={() => CreditRef.current}></ReactToPrint>
						{/* <PDFDownloadLink document={<CreditPdf />} fileName="CreditHistory">
              {({ loading }) =>
                loading ? (
                  <button>Loading.....</button>
                ) : (
                  <button>Download</button>
                )
              }
            </PDFDownloadLink> */}
						<BaseCard title='Credit History'>
							<Stack
								ref={CreditRef}
								spacing={2}>
								<CreditHistory />
							</Stack>
						</BaseCard>
					</Grid>
					<Grid item>
						<ReactToPrint
							trigger={() => (
								<button className='btn-sm btn-primary'>
									Download Debit Report
								</button>
							)}
							content={() => DebitRef.current}></ReactToPrint>
						{/* <button>Download</button> */}
						<BaseCard title='Debit History'>
							<Stack
								ref={DebitRef}
								spacing={2}>
								<DebitHistory />
							</Stack>
						</BaseCard>
					</Grid>
					<Grid item>
						<BaseCard title='Alert with Desc'>
							<Stack spacing={2}>
								<Alert severity='error'>
									<AlertTitle>Error</AlertTitle>
									This is an error alert — <strong>check it out!</strong>
								</Alert>
								<Alert severity='warning'>
									<AlertTitle>Warning</AlertTitle>
									This is a warning alert — <strong>check it out!</strong>
								</Alert>
								<Alert severity='info'>
									<AlertTitle>Info</AlertTitle>
									This is an info alert — <strong>check it out!</strong>
								</Alert>
								<Alert severity='success'>
									<AlertTitle>Success</AlertTitle>
									This is a success alert — <strong>check it out!</strong>
								</Alert>
							</Stack>
						</BaseCard>
					</Grid>
				</Grid>
				<div className='btn-group float-right'>
					<button className='btn'>1</button>
					<button className='btn btn-active'>2</button>
					<button className='btn'>3</button>
					<button className='btn'>4</button>
				</div>
			</FullLayout>
		</ThemeProvider>
	);
};

export default Report;
