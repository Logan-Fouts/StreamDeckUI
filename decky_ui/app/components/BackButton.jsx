export default function BackButton({ setSelectedBtn, setCurrBtns, prevBtns, setPrevBtns }) {

  const handleClick = () => {
    console.log("Back Button Clicked");
    let tmpPrev = prevBtns.pop();
    setPrevBtns(prevBtns);
    setSelectedBtn(null);
    setCurrBtns(tmpPrev);
  }
  
  return (
    <button className="w-20 bg-blue-400 text-xs font-bold aspect-square text-center" onClick={() => handleClick()}>
      Back
    </button>
  );
}
