import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MenuForm = ({ onMenuAdded, selectedMenu, selectedSubmenu }) => {
  const [name, setName] = useState('');
  const [parentId, setParentId] = useState(null);
  const [parentMenus, setParentMenus] = useState([]);
  const [menuId, setMenuId] = useState(null);
  const [depth, setDepth] = useState(1);

  useEffect(() => {
    const fetchParentMenus = async () => {
      try {
        const { data } = await axios.get('http://127.0.0.1:8000/api/menus/');
        const filteredMenus = data.filter(menu => menu.depth < 4);
        setParentMenus(filteredMenus);
      } catch (error) {
        console.error('Error fetching parent menus:', error);
      }
    };
    fetchParentMenus();
  }, []);

  useEffect(() => {
    if (selectedMenu) {
      setName(selectedMenu.name);
      setParentId(selectedMenu.parent_id || null);
      setDepth(selectedMenu.depth);
      setMenuId(selectedMenu.id);
    } else {
      setName('');
      setParentId(null);
      setDepth(1);
      setMenuId(null);
    }
  }, [selectedMenu]);

  useEffect(() => {
    if (selectedSubmenu) {
      setName(selectedSubmenu.name);
      setParentId(selectedSubmenu.parent || null);
      setMenuId(selectedSubmenu.id);
    }
  }, [selectedSubmenu]);

  const handleParentChange = (parentId) => {
    setParentId(parentId || null);
    if (parentId) {
      const parentMenu = parentMenus.find(menu => menu.id === parentId);
      setDepth(parentMenu.depth + 1);
    } else {
      setDepth(1);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/menus/', { name, parent_id: parentId });
      setMenuId(response.data.id);
      setName('');
      setParentId(null);
      setDepth(1);
      onMenuAdded();
    } catch (error) {
      console.error('Error adding menu:', error);
    }
  };

  return (
    <div className=" p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">{selectedMenu || selectedSubmenu ? 'Edit Menu' : 'Add New Menu'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Menu ID (Read-only) */}
        <div className="mb-4">
          <label htmlFor="menuId" className="block text-gray-700">Menu ID</label>
          <input
            id="menuId"
            type="text"
            value={menuId || 'Not assigned yet'}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
          />
        </div>

         {/* Depth (Read-only) */}
         <div className="mb-4">
          <label htmlFor="depth" className="block text-gray-700">Depth</label>
          <input
            id="depth"
            type="text"
            value={depth}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
          />
        </div>


          {/* Parent Data (Read-only) */}
          <div className="mb-4">
          <label htmlFor="parentData" className="block text-gray-700">Parent Data</label>
          <input
            id="parentData"
            type="text"
            value={parentId ? parentMenus.find(menu => menu.id === parentId)?.name : 'None'}
            
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="menuName" className="block text-gray-700">Name</label>
          <input
            id="menuName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

      

       

      
        <button
  type="submit"
  className="w-full bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600"
>
  {selectedMenu || selectedSubmenu ? 'Update' : 'Save'}
</button>

      </form>
    </div>
  );
};

export default MenuForm;
