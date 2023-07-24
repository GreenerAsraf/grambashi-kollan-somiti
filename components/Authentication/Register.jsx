import { AuthContext } from '@/Contexts/AuthProvider'
import Link from 'next/link'
import { useContext } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { Link, useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState('')
  const [signUpError, setSignUPError] = useState('')
  const [createdUserEmail, setCreatedUserEmail] = useState('')
  const { register, handleSubmit, reset } = useForm()
  const { createUser, updateUser } = useContext(AuthContext)
  // console.log(createUser, updateUser, 'AuthContext')
  // const navigate = useNavigate()
  // const location = useLocation()
  const onSubmit = (data) => {
    console.log(data, 'data in form')
    // const formData = new FormData()
  }

  const handleSignUp = (data) => {
    console.log(data, 'data in form')
    setSignUPError('')
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user
        console.log(user)
        toast('User Created Successfully.')

        const userInfo = {
          displayName: data.name
        }
        updateUser(userInfo)
          .then(() => {
            saveUser(data.name, data.email)
          })
          .catch((err) => console.log(err))
      })
      .catch((error) => {
        // setError(error)
        setSignUPError(error.message)
      })
  }

  //   const saveUser = (name, email) =>{
  //     const user ={name, email};
  //     fetch('https:/users', {
  //         method: 'POST',
  //         headers: {
  //             'content-type': 'application/json'
  //         },
  //         body: JSON.stringify(user)
  //     })
  //     .then(res => res.json())
  //     .then(data =>{
  //         setCreatedUserEmail(email);
  //     })
  // }

  return (
    <div className='hero w-full my-24'>
      <div className='card flex-shrink-0 w-full max-w-xl shadow-2xl bg-base-100 py-10'>
        <h1 className='text-5xl text-center font-bold'>Admin Register </h1>
        <form onSubmit={handleSubmit(handleSignUp)} className='card-body'>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Full Name</span>
            </label>
            <input
              type='text'
              name='name'
              {...register('name', { required: true })}
              placeholder='Enter your name'
              className='input input-bordered'
            />
          </div>

          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              type='email'
              name='email'
              {...register('email', { required: true })}
              placeholder='Enter your email'
              className='input input-bordered'
              required
            />
            <p className='text-red-600 font-semibold'>{error.slice(22, 45)}</p>
          </div>

          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Address</span>
            </label>
            <input
              type='text'
              name='address'
              {...register('address', { required: true })}
              placeholder='your address'
              className='input input-bordered'
            />
          </div>

          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Password</span>
            </label>
            <input
              type='password'
              name='password'
              {...register('password', { required: true })}
              placeholder='password'
              className='input input-bordered'
              required
            />
          </div>

          <div className='form-control mt-6'>
            <input className='btn btn-primary' type='submit' value='Register' />
          </div>
        </form>
        {/* if you are old user and you have an account */}
        <p className='text-center'>
          Already have an account?{' '}
          <Link className='text-orange-600 font-bold' href='/login'>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
