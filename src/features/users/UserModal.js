import Image from 'next/image';

const UserModal = ({ user }) => {
  // console.log('userModal', user)
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input
        type='checkbox'
        id={user?._id}
        className='modal-toggle'
      />
      <div className='modal'>
        <div className='modal-box relative'>
          <label
            htmlFor={user?._id}
            className='btn btn-sm btn-circle absolute right-2 top-2'>
            ✕
          </label>
          <Image
            className='w-60 h-60 rounded-xl'
            src={user?.image}
            width={400}
            height={400}
            alt={user?.userName}
          />
          <h3 className='text-lg font-bold mt-4'>{user?.memberRule}</h3>
          <p className=''>Address: {user?.address}</p>
          <p className=''>Father Name: {user?.fatherName}</p>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
