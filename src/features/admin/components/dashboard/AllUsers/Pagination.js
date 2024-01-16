import { useState } from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi2';

const Pagination = ({
  setPage,
  searchUser,
  page,
  totalCount,
  setPageSize,
  pageSize,
}) => {
  const [pre, setPre] = useState(0);
  const [next, setNext] = useState(10);
  const userLength = searchUser?.length;
  // console.log(totalCount, pageSize);

  let lnt = 0;
  lnt = parseInt(Math.ceil(userLength / 9));

  const arr = [];
  for (let i = 1; i <= lnt + 1; i++) {
    arr.push(i);
  }
  // console.log(arr);
  const pagination = (e) => {
    setPage(e);
    // setPageSize((p) => p + 10)
  };
  const prevBtn = () => {
    if (pre > 0) {
      setPre(pre - 1);
      setNext(next - 1);
      setPageSize((p) => p - 10);
      console.log(totalCount, pageSize);
    }
  };
  const nextBtn = () => {
    setPre(pre + 1);
    setNext(next + 1);
    setPageSize((p) => p + 10);
    setPage((p) => p + 1);
    console.log(totalCount, pageSize);
  };

  return (
    <div className='btn-group gap-3 flex justify-center mt-9'>
      <button
        className=' btn  btn-success btn-circle btn-outline '
        onClick={() => prevBtn()}>
        <HiChevronDoubleLeft />
      </button>
      {arr.slice(pre, next)?.map((ar) => (
        <button
          onClick={() => pagination(ar)}
          className={
            ar === page ? ' btn-success btn-circle' : ' btn-outline btn-circle'
          }>
          {ar}
        </button>
      ))}
      {/* <HiArrowRightCircle onClick={() => nextBtn()} /> */}
      <button
        className={
          totalCount > pageSize
            ? 'btn btn-success btn-circle btn-outline'
            : 'btn btn-disabled btn-circle  btn-outline'
        }
        onClick={() => totalCount > pageSize && nextBtn()}>
        <HiChevronDoubleRight color='black' />
      </button>
    </div>
  );
};

export default Pagination;
