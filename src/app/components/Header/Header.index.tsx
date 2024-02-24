'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const [hovered, setHovered] = useState(false);

  const router = useRouter();

  const handleClick = () => {
    router.replace('/');
  };

  return (
    <div
      className={
        'fixed h-20 w-full justify-between items-center pl-5 flex flex-row text-2xl dark:text-amber-100 dark:bg-emerald-950 shadow-gray-800'
      }>
      <p className={'font-thin text-3xl'}>Clear your mind</p>
      <div
        className={`h-full px-5 flex dark:text-emerald-100 justify-center items-center ${hovered ? 'dark:bg-emerald-900 cursor-pointer' : ''}
        border-b-2 border-b-amber-200`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ transition: 'background-color 0.2s ease' }}>
        <p onClick={handleClick}>Home</p>
      </div>
    </div>
  );
};
