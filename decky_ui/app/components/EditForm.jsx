import { useState, useEffect } from 'react';

const EditForm = ({ button, onSave, onCancel, isOpen }) => {
  if (isOpen == false || !button) return;

  const [formData, setFormData] = useState({
    id: '',
    label: '',
    type: 0,
    staticImgSrc: '',
    pressedImgSrc: ''
  });

  // Update form when button prop changes
  useEffect(() => {
    if (button) {
      setFormData({
        id: button.id || '',
        label: button.label || '',
        type: button.type || 0,
        staticImgSrc: button.staticImgSrc || '',
        pressedImgSrc: button.pressedImgSrc || ''
      });
    }
  }, [button]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!button) return null;

  return (
    <div className="fixed text-white inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-zinc-950 rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Edit Button</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Label Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Button Label
              </label>
              <input
                type="text"
                name="label"
                value={formData.label}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter button label"
              />
            </div>

            {/* Type Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Button Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={0}>Keybind</option>
                <option value={1}>Command</option>
                <option value={2}>Folder</option>
              </select>
            </div>
            { formData.type != 2 &&
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {formData.type == 0 ? <h1>Keybind</h1> : <h1>Command</h1>}
                </label>
                <input
                  type="text"
                  name="command"
                  value={formData.command}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter button label"
                />
              </div>
            }

            {/* Static Image Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Static Image URL
              </label>
              <input
                type="text"
                name="staticImgSrc"
                value={formData.staticImgSrc}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Pressed Image Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pressed Image URL
              </label>
              <input
                type="text"
                name="pressedImgSrc"
                value={formData.pressedImgSrc}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Image Preview */}
            {(formData.staticImgSrc || formData.pressedImgSrc) && (
              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Preview
                </label>
                <div className="flex space-x-4">
                  {formData.staticImgSrc && (
                    <div className="text-center">
                      <p className="text-xs text-gray-600 mb-1">Static</p>
                      <img 
                        src={formData.staticImgSrc} 
                        alt="Static preview" 
                        className="w-16 h-16 object-cover border rounded"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  {formData.pressedImgSrc && (
                    <div className="text-center">
                      <p className="text-xs text-gray-600 mb-1">Pressed</p>
                      <img 
                        src={formData.pressedImgSrc} 
                        alt="Pressed preview" 
                        className="w-16 h-16 object-cover border rounded"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
