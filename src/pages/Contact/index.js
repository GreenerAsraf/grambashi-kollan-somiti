import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'
import TopBar from '../../../components/Navbar/Navbar'

const index = () => {
  return (
    <div>
      <TopBar></TopBar>

      {/* <form
        className='bg-gray-400 w-full m-10'
        action={FORM_ENDPOINT}
        onSubmit={handleSubmit}
        method='POST'
        target='_blank'>
        <div className='mb-3 pt-0'>
          <input
            type='text'
            placeholder='Your name'
            name='name'
            className='px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full'
            required
          />
        </div>
        <div className='mb-3 pt-0'>
          <input
            type='email'
            placeholder='Email'
            name='email'
            className='px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full'
            required
          />
        </div>
        <div className='mb-3 pt-0'>
          <textarea
            placeholder='Your message'
            name='message'
            className='px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full'
            required
          />
        </div>
        <div className='mb-3 pt-0'>
          <button
            className='bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
            type='submit'>
            Send a message
          </button>
        </div>
      </form> */}

      <Card>
        <CardActionArea>
          <CardMedia
            component='img'
            height='140'
            image='/bkash.jpg'
            alt='green iguana'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              Lizard
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size='small' color='primary'>
            Share
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default index
