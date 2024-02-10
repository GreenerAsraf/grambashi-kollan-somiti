import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import EventModal from './EventModal';
// import Image from 'next/image'

const EventsCard = ({ event, setEvent }) => {
  console.log(event);
  const handleModal = (event) => {
    setEvent(event);
  };

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
          sx={{
            p: 0,
            width: '100%',
          }}>
          <Image
            src={event?.image}
            width={'624'}
            height={'417'}
            alt={event?.eventName}
          />

          <CardContent
            sx={{
              paddingLeft: '30px',
              paddingRight: '30px',
            }}>
            <Typography
              className='text-start'
              sx={{
                fontSize: 'h5.fontSize',
                fontWeight: '500',
              }}>
              {event?.eventName}
            </Typography>
            <Typography
              className='text-start'
              color='textSecondary'
              sx={{
                fontSize: '14px',
                fontWeight: '400',
                mt: 1,
              }}>
              {event?.description.slice(0, 200)} ....
            </Typography>
            <Button
              variant='contained'
              color={'primary'}>
              <label
                className='cursor-pointer'
                htmlFor='my-modal-3'
                onClick={() => handleModal(event)}>
                See Details
              </label>
            </Button>
          </CardContent>
        </Card>
      </Grid>
      {/* <EventModal event={event}></EventModal> */}
    </Grid>
  );
};

export default EventsCard;
