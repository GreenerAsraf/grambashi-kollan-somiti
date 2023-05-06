import React from 'react'
import { FaCamera } from 'react-icons/fa'
import Gallery from 'react-photo-gallery'

const index = () => {
  const photos = [
    {
      src: 'https://wallpaperaccess.com/full/211836.jpg',
      width: 200,
      height: 100,
      discription: 'This is a images gallery of grambashi kollan somity'
    },
    {
      src: 'https://c4.wallpaperflare.com/wallpaper/482/480/58/beautyful-scenery-wallpaper-preview.jpg',
      width: 200,
      height: 100,
      discription: 'This is a images gallery of grambashi kollan somity'
    },
    {
      src: 'https://wallpaperaccess.com/full/211836.jpg',
      width: 200,
      height: 100,
      discription: 'This is a images gallery of grambashi kollan somity'
    },
    {
      src: 'https://c4.wallpaperflare.com/wallpaper/482/480/58/beautyful-scenery-wallpaper-preview.jpg',
      width: 200,
      height: 100,
      discription: 'This is a images gallery of grambashi kollan somity'
    },
    {
      src: 'https://wallpaperaccess.com/full/211836.jpg',
      width: 200,
      height: 100,
      discription: 'This is a images gallery of grambashi kollan somity'
    },
    {
      src: 'https://c4.wallpaperflare.com/wallpaper/482/480/58/beautyful-scenery-wallpaper-preview.jpg',
      width: 200,
      height: 100,
      discription: 'This is a images gallery of grambashi kollan somity'
    }
    // add more images as needed
  ]

  return (
    <div>
      {/* <h2>This is gallery</h2> */}

      <h1>
        <FaCamera /> গ্রামবাসী কল্যাণ সমিতির স্মৃতিময় ছবি
      </h1>
      <Gallery photos={photos} />
    </div>
  )
}

export default index
