'use client';

import {useState} from "react";

interface Props {
  disabled?: boolean
  label?: string
  icon?: string
  style?: React.CSSProperties
  onClick: () => void
}


export const Button = ({disabled = false, onClick, icon, label, style}: Props) => {

  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(true);
    onClick();
  };

  return (
    <button
      className={
        `group border h-5 min-w-5 w-fit px-5 py-5 transition-all dark:border-emerald-900 flex hover:bg-emerald-900 rounded-2xl rounded-br-none items-center`
      }
      disabled={disabled}
      style={style}
      onClick={handleClick}>
      <p className={'font-light capitalize'}>
        {label}
      </p>
    </button>
  )
}
