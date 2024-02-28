interface Props {
  label: string;
  onClick: () => void;
  clicked?: boolean;
}

export const ListItem = ({ label, clicked, onClick }: Props) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`px-5 py-4 mx-5 my-1.5 rounded-md transition-all ${clicked ? 'bg-emerald-800' : 'bg-cyan-900 hover:bg-cyan-800'}`}>
      <p className={'text-cyan-50'}>{label}</p>
    </div>
  );
};
