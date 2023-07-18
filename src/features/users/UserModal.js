import Image from 'next/image'

const UserModal = ({ userData }) => {
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type='checkbox' id='my-modal-3' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box relative'>
          <label
            htmlFor='my-modal-3'
            className='btn btn-sm btn-circle absolute right-2 top-2'>
            ✕
          </label>
          <Image
            src={userData?.image}
            width={600}
            height={600}
            alt={userData?.userName}
          />
          <h3 className='text-lg font-bold mt-4'>{userData?.userName}</h3>
          <p className='py-4'>{userData?.description}</p>
        </div>
      </div>
    </div>
  )
}

export default UserModal
