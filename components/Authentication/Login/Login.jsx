import { AuthContext } from '@/Contexts/AuthProvider'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaGoogle } from 'react-icons/fa'

const Login = () => {
  const [error, setError] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const { signIn: login } = useContext(AuthContext)
  // const { providerLogin, login } = useContext( AuthContext );
  // const googleProvider = new GoogleAuthProvider();
  // const location = useLocation();
  // const navigate = useNavigate();
  // const [token] = useToken(loginEmail);

  // console.log( user )

  // const from = location.state?.from?.pathname || "/";
  const { back } = useRouter()
  // if (token) {
  //   navigate(from, { replace: true });
  // }

  // handle created user login
  const handleLogin = (event) => {
    event.preventDefault()
    const form = event.target
    const email = form.email.value
    const password = form.password.value

    // console.log( user )
    login(email, password)
      .then((result) => {
        const user = result.user
        console.log(user)
        setLoginEmail(user?.email)
        // navigate(from, { replace: true })
        back()
        form.reset()
        setError('')
      })
      .catch((error) => {
        console.error('error ', error)
        toast.error('Register first to login')
        setError(error.message)
        form.reset()
      })
  }

  // // handle google login
  // const handleGoogleSignIn = () => {
  //   providerLogin( googleProvider )
  //     .then( ( result ) => {
  //       const user = result.user;
  //       saveUsers( user?.displayName, user?.email, "jobSeeker" );
  //       navigate( from, { replace: true } );
  //     } )
  //     .catch( ( error ) => console.error( "error ", error ) );

  //   const saveUsers = ( name, email, role ) => {
  //     const info = { name, email, role };
  //     fetch( `${ ServerLink }/users`, {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify( info ),
  //     } )
  //       .then( ( res ) => res.json() )
  //       .then( ( data ) => {
  //         console.log( data );
  //         if ( data.acknowledged ) {
  //           // setLoginEmail(info?.email);
  //         }
  //       } );
  //   };
  // };

  const handleGoogleSignIn = () => {
    console.log('handleGoogleSignIn clicked ')
  }

  return (
    <div>
      <div className='hero w-full my-20'>
        <div className='card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100 py-10'>
          <h1 className='text-5xl text-center font-bold'>Admin Login </h1>
          <form onSubmit={handleLogin} className='card-body'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type='email'
                name='email'
                placeholder='email'
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
                placeholder='password'
                className='input input-bordered'
              />
              <label className='label'>
                <Link href='#' className='label-text-alt link link-hover'>
                  Forgot password?
                </Link>
              </label>
              <p className='text-start text-red-600 font-semibold'>
                {error.slice(22, 43)}
              </p>
            </div>
            <div className='form-control mt-6'>
              <input
                className='btn btn-primary'
                type='submit'
                value='Login'
                href='/admin'
              />
            </div>
          </form>

          {/* <p className='text-center'>
            New to Grambashi Kollan Somity
            <Link
              htmlFor='sign-up-modal'
              className='text-orange-600 font-bold cursor-pointer'
              href='/Register'>
              Sign Up
            </Link>
          </p> */}

          <div className='divider'>OR</div>

          <button
            onClick={handleGoogleSignIn}
            className='btn btn-outline btn-info mx-9 mt-5'>
            <FaGoogle /> <span className='ml-2'>Google</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
