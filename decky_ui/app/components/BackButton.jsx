import { FaArrowLeft } from 'react-icons/fa';
export default function BackButton({ setSelectedBtn, setCurrBtns, prevBtns, setPrevBtns, handleBackClick }) {

  const handleClick = () => {
    handleBackClick();
    let tmpPrev = prevBtns.pop();
    setPrevBtns(prevBtns);
    setSelectedBtn(null);
    setCurrBtns(tmpPrev);
  }
  
  return (
    <button className="w-20 bg-blue-400 text-xs font-bold aspect-square text-center" onClick={() => handleClick()}>
      <FaArrowLeft size={24} className="mx-auto mt-2 mb-1" />
    </button>
  );
}
