import React from 'react'
import FeatherIcon from 'feather-icons-react'
import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import PropTypes from 'prop-types'
// Dropdown Component
import SearchDD from './SearchDD'
import ProfileDD from './ProfileDD'
import LogoIcon from '../logo/LogoIcon'
import { Typography } from '@material-tailwind/react'
import Link from 'next/link'

const Header = ({ sx, customClass, toggleMobileSidebar, position }) => {
  return (
    <AppBar sx={sx} position={position} elevation={0} className={customClass}>
      <Toolbar>
        <IconButton
          size='large'
          color='inherit'
          aria-label='menu'
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: 'none',
              xs: 'flex'
            }
          }}>
          <FeatherIcon icon='menu' width='20' height='20' />
        </IconButton>
        {/* ------------------------------------------- */}
        {/* Search Dropdown */}
        {/* ------------------------------------------- */}
        {/* <SearchDD /> */}
        {/* ------------ End Menu icon ------------- */}
        <Box flexGrow={1} />
        <Link href={'/'}>
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={'.5rem'}
            mt={'1rem'}
            paddingX={'2rem'}
            sx={{
              display: {
                lg: 'none',
                xs: 'flex'
              }
            }}>
            <LogoIcon />
            <Typography>আমরা গ্রামবাসী কল্যাণ সমিতি</Typography>
          </Box>
        </Link>
        {/* <ProfileDD /> */}
        {/* ------------------------------------------- */}
        {/* Profile Dropdown */}
        {/* ------------------------------------------- */}
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  sx: PropTypes.object,
  customClass: PropTypes.string,
  position: PropTypes.string,
  toggleSidebar: PropTypes.func,
  toggleMobileSidebar: PropTypes.func
}

export default Header
