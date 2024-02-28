'use client';

import React, { useState } from 'react';
import { ButtonBase } from '@mui/material';

interface Props {
  disabled?: boolean;
  label?: string;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  onClick: () => void;
  onHoverIn?: () => void;
  onHoverOut?: () => void;
  outlined?: boolean;
}

export const Button = ({
  disabled = false,
  onClick,
  onHoverIn,
  onHoverOut,
  icon,
  label,
  style,
  textStyle,
  outlined = false,
}: Props) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    onClick();
  };

  return (
    <ButtonBase
      className={`${outlined && 'border'} min-h-12 min-w-12 transition-all dark:border-emerald-50 flex justify-center hover:bg-emerald-900 rounded-2xl items-center`}
      disabled={disabled}
      disableRipple
      style={{
        ...{
          borderRadius: 10,
        },
        ...style,
      }}
      onClick={handleClick}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}>
      {icon && icon}
      {label && (
        <p style={textStyle} className={'font-light px-5 capitalize text-emerald-50'}>
          {label}
        </p>
      )}
    </ButtonBase>
  );
};
