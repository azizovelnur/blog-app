import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {GoMarkGithub} from "react-icons/go";
import {FaUserAlt} from "react-icons/fa";
import {HiArrowDown} from "react-icons/hi";

const Header: FC = () => {
  return (

    <header className={'headerGrid fixed w-full text-[16px] bg-[#fff] text-[#000] border-b-[1px] border-b-[#e0e0e0]'}>

      <div className={'container mx-auto max-w-[1280px]'}>

        <div
          className={'flex justify-between items-center h-[50px]'}>

          <Link to={'/'}>
            <div className={'flex items-center'}>
              <h2 className={'text-[#fff] font-black bg-black text-[22px] rounded-[4px] px-[4px]'}>P+B</h2>
            </div>
          </Link>


          <div className={'flex justify-between w-[100px] items-center'}>

            <div className={'bg-black text-white cursor-pointer rounded-[4px] p-[2px]'}>
              Log In
            </div>


            <div className={'flex justify-between w-[40px] h-[20px] hover:border-[1px] hover:border-black'}>
              <FaUserAlt/>
              <HiArrowDown/>
            </div>
          </div>
        </div>

      </div>
    </header>
  )
}

export {Header};