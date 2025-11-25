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
    <button 
      className={`
        w-20 aspect-square
        ${selectedBtn && selectedBtn.id === button.id 
          ? 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700' 
          : 'bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900'
        }
        border border-slate-600
        rounded-2xl
        shadow-[0_4px_0_0_rgb(15,23,42)]
        hover:translate-y-[4px]
        hover:shadow-[0_4px_0_0_rgb(15,23,42)]
        active:translate-y-[6px]
        active:shadow-[0_2px_0_0_rgb(15,23,42)]
        transition-all
        duration-200
        ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
        relative
        overflow-hidden
        group
      `} 
      onDoubleClick={() => handleDoubleClick()} 
      onClick={() => handleClick()}
    >
      {/* Modern gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-2xl" />
      
      {/* Subtle inner glow */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
      
      {/* Content with modern spacing */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-2 transform group-hover:scale-95 transition-transform duration-200">
        {button.type === 2 ? (
          <FaFolder size={20} className="mb-1 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-200" />
        ) : null}
        <h1 className="text-xs font-semibold text-white text-center drop-shadow-lg tracking-wide">
          {button.label}
        </h1>
      </div>
    </button>
  );
}
