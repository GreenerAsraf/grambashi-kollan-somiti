import {
  useAddBalanceMutation,
  useGetBalanceQuery
} from '@/slices/api/balanceApi'
import { BiEdit } from 'react-icons/bi'

const BalanceUpdate = ({ user }) => {
  const { totalBalance, memberId, name } = user
  const { data: balance } = useGetBalanceQuery()
  const [addBalance] = useAddBalanceMutation()
  const paymentInfo = balance?.result?.filter(
    (uid) => uid?.memberId == memberId && uid?.amount > 0
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const famount = +form.amount.value
    const memberName = form.name.value
    const memberId = +form.id.value
    let lamount = form.lamount.value

    let amount = famount - lamount

    // let amount = totalBalance - camount;
    // let amount = camount - totalBalance;

    const data = {
      amount,
      memberName,
      memberId
    }
    // console.log(data);
    if (famount < lamount) {
      addBalance(data)
    }
    form.reset()
  }

  return (
    <div>
      <label htmlFor='updateModal'>
        <BiEdit className=' ml-3 mt-1 cursor-pointer' />
      </label>
      <input type='checkbox' id='updateModal' className='modal-toggle' />
      <div className='modal' role='dialog'>
        <div className='modal-box '>
          <h3 className='font-bold text-lg'>{name}</h3>
          <p className='py-2'>Total Balance: {totalBalance}</p>
          <form onSubmit={handleSubmit} className=''>
            <p className='mb-3'>
              {' '}
              {paymentInfo?.slice(0, 1)?.map((amt) => (
                <>
                  <label>Last Paid Amount:</label>
                  <input
                    readOnly
                    type='text'
                    name='lamount'
                    value={amt.amount}
                  />
                </>
              ))}
            </p>
            <input readOnly hidden type='text' name='name' value={user?.name} />
            <input
              readOnly
              hidden
              type='number'
              name='id'
              value={user?.memberId}
            />
            <span className='flex justify-between'>
              <input
                type='number'
                placeholder='Enter correct amount'
                name='amount'
                className='input input-bordered'
                min={1}
              />
              <button type='submit' className='btn btn-info btn-outline'>
                submit
              </button>
            </span>
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
  )
}

export default BalanceUpdate
