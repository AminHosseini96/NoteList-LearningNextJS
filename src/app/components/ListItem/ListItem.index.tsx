import { useState } from 'react';

interface Props {
  label: string;
  onClick: () => void;
}

export const ListItem = ({ label, onClick }: Props) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={'px-5 py-4 mx-5 my-1.5 rounded-md transition-all hover:bg-cyan-800 bg-cyan-900'}
      style={{ backgroundColor: clicked ? 'rgb(6,95,70)' : 'rgb(22,78,99)' }}>
      <p className={'text-cyan-50'}>{label}</p>
    </div>
  );
};
