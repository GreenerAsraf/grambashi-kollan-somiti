import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

export default function TopBar() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <Link href="/event" className="flex items-center">
          Events
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <Link href="#" className="flex items-center">
          Users
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <Link href="#" className="flex items-center">
          Gallery
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <Link href="#" className="flex items-center">
          Contact
        </Link>
      </Typography>
    </ul>
  );

  return (
    <div>
      <div className="flex justify-between bg-[#009B90] max-w-screen-2xl mx-auto rounded-md pt-1 px-3 text-white">
        <p>phone</p>
        <div>
          <p>social</p>
        </div>
      </div>
      <div className="flex items-center gap-5 justify-center my-4 ">
        <Image src={`/logo.png`} alt="" width="100" height="100" />
        <h1 className="text-black font-bold text-3xl text-center py-2">
          আমরা গ্রামবাসী কল্যাণ সমিতি
        </h1>
      </div>
      <Navbar className="mx-auto py-2 px-4 bg-[#009B90] lg:px-8 lg:py-4">
        <div className="container mx-auto flex items-center justify-between ">
          <Typography
            as="a"
            href="#"
            variant="small"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            <Link href="/">Home</Link>
          </Typography>
          <div className="hidden lg:block">{navList}</div>
          {/* <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
          >
            <span>Buy Now</span>
          </Button> */}
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
        <MobileNav open={openNav}>
          <div className="container mx-auto">
            {navList}
            {/* <Button variant="gradient" size="sm" fullWidth className="mb-2">
              <span>Buy Now</span>
            </Button> */}
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
}
