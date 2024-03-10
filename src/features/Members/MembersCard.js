import { Card, CardContent, Grid, Typography } from '@mui/material';
import Image from 'next/image';

const MembersCard = ({ member }) => {
  // console.log(member);
  return (
    <Grid
      container
      className='flex justify-center'>
      <Grid
        item
        xs={12}
        lg={10}
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}>
        <Card
          style={{
            backgroundColor: member?.releaseStatus
              ? 'rgba(125,125, 125, 0.2)'
              : 'rgba(255, 255, 255, 1)',
          }}
          sx={{
            p: 0,
            width: '100%',
          }}>
          <span className='indicator'>
            {member?.releaseStatus ? (
              <span className='indicator-item indicator-center indicator-middle badge badge-ghost  opacity-60 text-2xl w-56 h-56 rounded-full font-semibold'>
                অব্যাহতি
              </span>
            ) : null}
            <Image
              className='w-[250px] h-[250px] rounded-full p-5 mx-auto'
              src={member?.image}
              width={'600'}
              height={'200'}
              alt={member?.title}
            />
          </span>

          {/* </figure> */}
          <CardContent
            sx={{
              paddingLeft: '30px',
              paddingRight: '30px',
            }}>
            <Typography
              sx={{
                fontSize: '22px',
                fontWeight: '600',
              }}>
              {member?.name}
            </Typography>
            <Typography>{member?.memberRole?.role}</Typography>
            <span>Total Balance: </span>
            <p
              className={`inline text-start text-lg py-2 ${
                member?.totalBalance === 0 ? 'text-red-300' : 'text-green-300'
              }`}>
              {member?.totalBalance}
            </p>
            <Typography
              color='textSecondary'
              sx={{
                fontSize: '15px',
                fontWeight: '600',
                mt: 1,
              }}>
              {member?.title}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MembersCard;
