import react, { useState, useEffect } from "react";
import BasicButton from "./BasicButton.jsx";
import BackButton from "./BackButton.jsx";
import EditForm from "./EditForm.jsx";

let KEYBIND = 0, COMMAND = 1, FOLDER = 2, BACK = 3;

export default function StreamDeck({ rows, cols }) {
  const [currBtns, setCurrBtns] = useState([]);
  const [prevBtns, setPrevBtns] = useState([]);
  const [parents, setParents] = useState([]);
  const [selectedBtn, setSelectedBtn] = useState(null);
  const [editFormOpen, setFormOpen] = useState(false);

  const printStatus = () => {
    console.log("\n\nSTATUS...")
    if (parents.length > 0) console.log("Current Parent:", parents[parents.length - 1].label);
    else console.log("Current Parent: root");

    if (prevBtns.length > 0) console.log("PrevBtns Stack:", prevBtns);
    else console.log("PrevBtns Stack: none");
  }

  const saveConfig = async (buttons) => {
    try {
      let tmpBtns = await window.electronAPI.readConfig();

      // No parents, replace root level
      if (parents.length === 0) {
        await window.electronAPI.saveConfig(buttons);
        return;
      }

      const parentId = parents[parents.length - 1].id;

      // Recurse to find and update parent
      const updateParentChildren = (nodes) => {
        for (const node of nodes) {
          if (node.id === parentId) {
            node.child = buttons;
            return true;
          }
          if (node.child && updateParentChildren(node.child)) {
            return true;
          }
        }
        return false;
      };

      if (updateParentChildren(tmpBtns)) {
        await window.electronAPI.saveConfig(tmpBtns);
      } else {
        console.error("Parent not found");
      }
    } catch (error) {
      console.error("Error in saveConfig:", error);
    }
  }

  const getValidID = async () => {
    try {
      const loadedButtons = await window.electronAPI.readConfig();
      
      const findHighID = (buttons) => {
        let highestID = -1;
        
        const traverse = (items) => {
          items.forEach(item => {
            if (item.id > highestID) {
              highestID = item.id;
            }
            if (item.child && item.child.length > 0) {
              traverse(item.child);
            }
          });
        };
        
        traverse(buttons);
        return highestID;
      };

      const highestID = findHighID(loadedButtons);
      console.log("Highest ID", highestID);
      return highestID + 1;
      
    } catch (error) {
      console.error("Error loading button configuration:", error);
      return 0; // Return a default ID instead of undefined
    }
  }

  const updateButtons = async (newBtns, backTrack) => {
    // Throw error too many buttons for specific device 
    if (newBtns.length > rows * cols) return null;
  
    if (backTrack == false) {
      prevBtns.push(currBtns);
      setPrevBtns(prevBtns);
    }
    
    let tooFewBtns = newBtns.length < rows * cols;
    
    // No buttons on page
    if (newBtns.length == 0) {
      const validID = await getValidID();
      const tmpBtns = Array(rows*cols).fill().map((_, i) => ({ id: i + validID, label: '', type: 0 }));
      tmpBtns[0].type = BACK;
      setCurrBtns(tmpBtns);
      saveConfig(tmpBtns, parents);
      printStatus();
      return;
    }

    // Too few buttons and no back button doesnt handle if all buttons already exist
    if (tooFewBtns && newBtns[0].id != BACK) {
      const validID = await getValidID();
      const tmpBtns = Array(rows*cols).fill().map((_, i) => ({ id: i + validID, label: '', type: 0 }));
      tmpBtns[0].type = BACK;
      for (let i = 1; i < newBtns.length; i++) tmpBtns[i] = newBtns[i];
      setCurrBtns(tmpBtns);
      saveConfig(tmpBtns, parents);
      printStatus();
      return;
    }

    // Too few buttons but back button already exists
    if (tooFewBtns && newBtns[0].id == BACK) {
      const validID = await getValidID();
      const tmpBtns = Array(rows*cols).fill().map((_, i) => ({ id: i + validID, label: '', type: 0 }));
      for (let i = 0; i < newBtns.length; i++) tmpBtns[i] = newBtns[i];
      setCurrBtns(tmpBtns);
      saveConfig(tmpBtns, parents);
      printStatus();
      return;
    }

    setCurrBtns(newBtns);
    printStatus();
  }

  const loadConfig = async () => {
    try {
      const loadedButtons = await window.electronAPI.readConfig();
      updateButtons(loadedButtons, true);
    } catch (error) {
      console.error("Error loading button configuration:", error);
    }
  }

  useEffect(() => {
    loadConfig();
  }, []);

  const handleFolderClick = (button) => {
    parents.push(button);
    setParents(parents);
  }

  const handleBackClick = () => {
    parents.pop();
  }

  const handleSaveButton = async (formData) => {
    const cleanedFormData = {
      ...formData,
      ...(formData.type !== 2 && { child: null })
    };
    
    let updatedBtns = currBtns.map(btn => btn.id === cleanedFormData.id ? { ...btn, ...cleanedFormData } : btn);
    console.log("Updated Buttons:", updatedBtns);
    setFormOpen(false);
    setSelectedBtn(null);
    updateButtons(updatedBtns, true);
    saveConfig(updatedBtns, parents);
  }

  const handleCancelEdit = () => {
    // TODO
    setFormOpen(false);
  }

  const colsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
    8: 'grid-cols-8'
  };

  const handleButtonClick = (btn) => {
    setSelectedBtn(btn);
  }

  return (
    <div className={`w-full rounded-xl ${cols === 8 ? 'max-w-3xl' : cols === 5 ? 'max-w-lg' : 'max-w-xs'} aspect-video mx-auto border border-white px-8 pt-4 pb-8`}>
      <div className="flex items-center justify-center gap-4 mb-4">
        <h1>StreamDeck</h1>
        <button className={`px-2 py-1 rounded-lg ${selectedBtn ? `bg-green-600` : `bg-gray-900`}`} onClick={() => {if (selectedBtn) setFormOpen(true)}}>Edit</button>
      </div>
      <div className={`grid grid-flow-row ${colsClasses[cols]} gap-4 justify-center`}>
        {currBtns.map((button, index) => (
          <div key={index}>
            {editFormOpen ? null : (
              button.type !== BACK ? (
                <BasicButton 
                  selectedBtn={selectedBtn} 
                  button={button} 
                  setSelectedBtn={setSelectedBtn} 
                  setCurrBtns={updateButtons} 
                  handleFolderClick={handleFolderClick} 
                />
              ) : (
                <BackButton 
                  setCurrBtns={updateButtons} 
                  prevBtns={prevBtns} 
                  setSelectedBtn={setSelectedBtn} 
                  setPrevBtns={setPrevBtns} 
                  handleBackClick={handleBackClick}
                />
              )
            )}
          </div>
        ))}
      </div>
      <EditForm
        button={selectedBtn}
        isOpen={editFormOpen}
        onSave={handleSaveButton}
        onCancel={handleCancelEdit}
      />
    </div>
  );
}

