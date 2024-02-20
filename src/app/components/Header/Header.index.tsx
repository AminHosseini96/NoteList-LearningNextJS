'use client';

import {useState} from "react";
import {useRouter} from 'next/navigation'

export const HeaderIndex = () => {

  const [hovered, setHovered] = useState(false)

  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <div className={"fixed h-20 w-full justify-between items-center pl-5 flex flex-row text-2xl dark:text-amber-100 dark:bg-emerald-900 "}>
      <p className={'font-thin text-3xl'}>Clear your mind</p>
      <div
        className={
          `h-full px-5 flex dark:text-emerald-100 justify-center items-center ${hovered ? 'dark:bg-emerald-800 cursor-pointer' : 'dark:bg-emerald-900'}
        border-b-2 border-b-amber-200`
        }
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{transition: 'background-color 0.2s ease'}}
      >
        <p onClick={() => {
        }}>Home</p>
      </div>
    </div>
  )
}
