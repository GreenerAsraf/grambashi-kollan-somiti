import React from 'react';
import { BiEdit } from 'react-icons/bi';

const BalanceUpdate = ({ name, memberId, user }) => {
  // console.log(name);
  // const { totalBalance, memberId, name } = user;
  return (
    <div>
      <label htmlFor='updateModal'>
        <BiEdit className=' ml-3 mt-1 cursor-pointer' />
      </label>
      <input
        type='checkbox'
        id='updateModal'
        className='modal-toggle'
      />
      <div
        className='modal'
        role='dialog'>
        <div className='modal-box '>
          <h3 className='font-bold text-lg'>{name}</h3>
          <p className='py-2'>Total Balance: {user.totalBalance}</p>
          <p className='pb-2'>Last Paid Amount: {}</p>
          <form className='flex justify-between mt-3'>
            <input
              type='number'
              placeholder='Enter correct amount'
              name='amount'
              className='input input-bordered'
              min={1}
            />
            <button
              type='submit'
              className='btn btn-info btn-outline'>
              submit
            </button>
          </form>
          <div className='modal-action'>
            <label
              htmlFor='updateModal'
              className='btn btn-sm btn-circle btn-error btn-outline absolute right-2 top-2'>
              X
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceUpdate;
