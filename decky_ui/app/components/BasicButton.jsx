import { FaFolder } from 'react-icons/fa';

let backTrack = false;

export default function BasicButton({ selectedBtn, button, setSelectedBtn, setCurrBtns, handleFolderClick }) {

  const handleClick = () => {
    if (selectedBtn && selectedBtn.id == button.id) {
      setSelectedBtn(null);
      return;
    }
    setSelectedBtn(button);
  }

  const handleDoubleClick = () => {
    if (button.type != 2) return;

    handleFolderClick(button);
    if (button.child) {
      setCurrBtns(button.child, false);
      setSelectedBtn(null);
    } else {
      setCurrBtns([], false);
      setSelectedBtn(null);
    }
  }
  
  return (
    <button className="w-20 bg-blue-400 text-xs font-bold aspect-square text-center" onDoubleClick={() => handleDoubleClick()} onClick={() => handleClick()}>
      {button.type === 2 ? <FaFolder size={24} className="mx-auto mt-2 mb-1" /> : null}
      <h1>{button.label}</h1>
    </button>
  );
}
