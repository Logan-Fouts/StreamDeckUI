let backTrack = false;

export default function BasicButton({ button, setSelectedBtn, setCurrBtns }) {

  const handleClick = () => {
    setSelectedBtn(button);
  }

  const handleDoubleClick = () => {
    console.log("Button Double Clicked");
    if (button.child) {
      console.log(button.child);
      setCurrBtns(button.child, false);
      setSelectedBtn(null);
    } else {
      setSelectedBtn(button);
    }
  }
  
  return (
    <button className="w-20 bg-blue-400 text-xs font-bold aspect-square text-center" onDoubleClick={() => handleDoubleClick()} onClick={() => handleClick()}>
      <h1>{button.label}</h1>
    </button>
  );
}
