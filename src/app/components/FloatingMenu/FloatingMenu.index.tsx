import React from 'react';
import { Grow } from '@mui/material';

interface Props {
  items?: React.ReactNode[];
  showMenu: boolean;
  onHoverIn?: () => void;
  onHoverOut?: () => void;
}

export const FloatingMenu = ({ items, showMenu, onHoverIn, onHoverOut }: Props) => {
  return (
    <Grow
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      in={showMenu}
      style={{ transformOrigin: 'right' }}
      {...(showMenu ? { timeout: 400 } : {})}>
      <div
        className={`border-2 px-0.5 py-0.5 dark:border-emerald-900 flex flex-row items-center justify-between ${items && items?.length > 10 && 'max-w-60 flex-wrap'}`}
        style={{
          width: items ? items?.length * 52 : 'auto',
          borderRadius: 15,
        }}>
        {items}
      </div>
    </Grow>
  );
};
