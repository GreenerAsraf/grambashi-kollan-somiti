import React, { useState } from 'react';
import { HiChevronDoubleRight, HiChevronDoubleLeft } from 'react-icons/hi2';

const Pagination = ({ setPage, searchUser, page }) => {
  const [pre, setPre] = useState(0);
  const [next, setNext] = useState(10);
  const userLength = searchUser?.length;
  // console.log(userLength);

  let lnt = 0;
  lnt = parseInt(Math.ceil(userLength / 9));

  const arr = [];
  for (let i = 1; i <= lnt; i++) {
    arr.push(i);
  }
  const pagination = (e) => {
    setPage(e);
  };
  const prevBtn = () => {
    if (pre > 0) {
      setPre(pre - 1);
      setNext(next - 1);
    }
  };
  const nextBtn = () => {
    setPre(pre + 1);
    setNext(next + 1);
  };

  return (
    <div className='btn-group gap-3 flex justify-center mt-9'>
      <button
        className=' btn-outline btn-success'
        onClick={() => prevBtn()}>
        <HiChevronDoubleLeft />
      </button>
      {arr.slice(pre, next).map((ar) => (
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
        className={next === lnt ? 'btn-disabled' : 'btn-outline btn-success'}
        onClick={() => nextBtn()}>
        <HiChevronDoubleRight />
      </button>
    </div>
  );
};

export default Pagination;
