import { useState, useEffect, useContext } from 'react'
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton
} from '@material-tailwind/react'
import Image from 'next/image'
import Link from 'next/link'
import { useGetNoticeQuery } from '@/slices/api/noticeApi'
import LoginIcon from '@mui/icons-material/Login'
import { Button } from '@mui/material'
import { AuthContext } from '@/Contexts/AuthProvider'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPhone } from '@fortawesome/free-solid-svg-icons';
// import { faFacebook } from '@fortawesome/free-brands-svg-icons';

export default function TopBar() {
  const [openNav, setOpenNav] = useState(false)
  const { data, isLoading } = useGetNoticeQuery()
  const signout = () => {
    logOut()
  }
  let notice = ''
  if (!isLoading) {
    notice = data[0]
  }
  // console.log(notice)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const { user, logOut } = useContext(AuthContext)
  const navList = (
    <ul className='mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
      <Typography
        as='li'
        variant='small'
        color='white'
        className='p-1 font-medium'>
        <Link href='/event' passHref className='flex items-center'>
          Events
        </Link>
      </Typography>

      <Typography
        as='li'
        variant='small'
        color='white'
        className='p-1 font-medium'>
        <Link href='/users' passHref className='flex items-center'>
          Members
        </Link>
      </Typography>

      <Typography
        as='li'
        variant='small'
        color='white'
        className='p-1 font-medium'>
        <Link href='/gallery' passHref className='flex items-center'>
          Constitution
        </Link>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='white'
        className='p-1 font-medium'>
        <Link href='/Contact' passHref className='flex items-center'>
          Contact
        </Link>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='white'
        className='p-1 font-medium'>
        {user ? (
          <Typography variant='small' color='white' className='p-1 font-medium'>
            {/* {user.email} */}
            <button className=' btn btn-circle p-1' onClick={signout}>
              Log Out
            </button>
            {user?.displayName}

            <Link
              href='/admin'
              variant='gradient'
              size='sm'
              className='m-1 p-1'>
              Admin
            </Link>
          </Typography>
        ) : (
          <Link href='/login' variant='gradient' size='sm' className=''>
            <span>Login</span>
          </Link>
        )}
      </Typography>
    </ul>
  )

  return (
    <div>
      <div className='flex itemsl-center gap-9 justify-around my-4 '>
        <Image src={`/logo.png`} alt='logo' width='100' height='100' />
        <h1 className='text-black font-bold text-3xl text-center py-9'>
          আমরা গ্রামবাসী কল্যাণ সমিতি
        </h1>
        {/* <img src={'/licensed-image.png'} alt='logo' width={100} height={100} />
        <Button className='text-black font-bold text-2xl text-center py-9'>
           Login as Admin
        </Button> */}
      </div>
      <Navbar className='mx-auto py-2 px-4 bg-[#009B90] lg:px-8 lg:py-4'>
        <div className='container mx-auto flex items-center justify-between '>
          <Typography
            as='a'
            href='#'
            variant='small'
            className='mr-4 cursor-pointer py-1.5 font-medium'>
            <Link href='/'>Home</Link>
          </Typography>

          <div className='hidden lg:block'>{navList}</div>
          {/* <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
          >
            <span>Buy Now</span>
          </Button> */}
          <IconButton
            variant='text'
            className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
            ripple={false}
            onClick={() => setOpenNav(!openNav)}>
            {openNav ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                className='h-6 w-6'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            )}
          </IconButton>
        </div>
        <MobileNav open={openNav}>
          <div className='container mx-auto'>
            {navList}
            {/* <Button variant="gradient" size="sm" fullWidth className="mb-2">
              <span>Buy Now</span>
            </Button> */}
          </div>
        </MobileNav>
      </Navbar>
      <marquee
        className='mt-1 pt-1 text-3xl text-green-500'
        behavior='scroll'
        direction='left'>
        {notice?.notice ||
          `নতুন কোনো নোটিশ আসলে সাথেই সাথেই আপডেট পেয়ে যাবেন। আমদের সাথে থাকার জন্য
        ধন্যবাদ।`}
      </marquee>
    </div>
  )
}

// <div className='flex justify-between items-center bg-[#009B90] max-w-screen-2xl mx-auto rounded-md py-1 px-2 text-white'>
// 	{/* <p>phone</p> */}
// 	<div className='flex gap-1 items-center'>
// 		<FontAwesomeIcon
// 			// beatFade
// 			icon={faPhone}
// 			style={{ color: '#ffffff' }}
// 		/>
// 		<a href='tel:+880 1814-354407'>+880 1814-354407</a>
// 	</div>
// 	<div className='flex items-center gap-2'>
// 		{/* <p>social</p> */}
// 		<FontAwesomeIcon icon={faFacebook} />
// 	</div>
// </div>;
