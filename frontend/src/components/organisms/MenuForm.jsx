// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const MenuForm = ({ onMenuAdded, selectedMenu, selectedSubmenu }) => {
//   const [name, setName] = useState('');
//   const [parentId, setParentId] = useState(null);
//   const [parentMenus, setParentMenus] = useState([]);
//   const [menuId, setMenuId] = useState(null);
//   const [depth, setDepth] = useState(1);

//   useEffect(() => {
//     const fetchParentMenus = async () => {
//       try {
//         const { data } = await axios.get('http://127.0.0.1:8000/api/menus/');
//         const filteredMenus = data.filter(menu => menu.depth < 4);
//         setParentMenus(filteredMenus);
//       } catch (error) {
//         console.error('Error fetching parent menus:', error);
//       }
//     };
//     fetchParentMenus();
//   }, []);

//   useEffect(() => {
//     if (selectedMenu) {
//       setName(selectedMenu.name);
//       setParentId(selectedMenu.parent_id || null);
//       setDepth(selectedMenu.depth);
//       setMenuId(selectedMenu.id);
//     } else {
//       setName('');
//       setParentId(null);
//       setDepth(1);
//       setMenuId(null);
//     }
//   }, [selectedMenu]);

//   useEffect(() => {
//     if (selectedSubmenu) {
//       setName(selectedSubmenu.name);
//       setParentId(selectedSubmenu.parent || null);
//       setMenuId(selectedSubmenu.id);
//     }
//   }, [selectedSubmenu]);

//   const handleParentChange = (parentId) => {
//     setParentId(parentId || null);
//     if (parentId) {
//       const parentMenu = parentMenus.find(menu => menu.id === parentId);
//       setDepth(parentMenu.depth + 1);
//     } else {
//       setDepth(1);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/menus/', { name, parent_id: parentId });
//       setMenuId(response.data.id);
//       setName('');
//       setParentId(null);
//       setDepth(1);
//       onMenuAdded();
//     } catch (error) {
//       console.error('Error adding menu:', error);
//     }
//   };

//   return (
//     <div className=" p-6 rounded-lg">
//       <h2 className="text-xl font-semibold mb-4">{selectedMenu || selectedSubmenu ? 'Edit Menu' : 'Add New Menu'}</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Menu ID (Read-only) */}
//         <div className="mb-4">
//           <label htmlFor="menuId" className="block text-gray-700">Menu ID</label>
//           <input
//             id="menuId"
//             type="text"
//             value={menuId || 'Not assigned yet'}
//             readOnly
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
//           />
//         </div>

//          {/* Depth (Read-only) */}
//          <div className="mb-4">
//           <label htmlFor="depth" className="block text-gray-700">Depth</label>
//           <input
//             id="depth"
//             type="text"
//             value={depth}
//             readOnly
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
//           />
//         </div>


//           {/* Parent Data (Read-only) */}
//           <div className="mb-4">
//           <label htmlFor="parentData" className="block text-gray-700">Parent Data</label>
//           <input
//             id="parentData"
//             type="text"
//             value={parentId ? parentMenus.find(menu => menu.id === parentId)?.name : 'None'}
            
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//           />
//         </div>

//         {/* Name */}
//         <div className="mb-4">
//           <label htmlFor="menuName" className="block text-gray-700">Name</label>
//           <input
//             id="menuName"
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//             required
//           />
//         </div>

      

       

      
//         <button
//   type="submit"
//   className="w-full bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600"
// >
//   {selectedMenu || selectedSubmenu ? 'Update' : 'Save'}
// </button>

//       </form>
//     </div>
//   );
// };

// export default MenuForm;

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
        setParentMenus(data);
      } catch (error) {
        console.error('Error fetching parent menus:', error);
      }
    };
    fetchParentMenus();
  }, []);

  useEffect(() => {
    if (selectedMenu) {
      // If editing an existing menu, fetch its depth from the database
      setName(selectedMenu.name);
      setParentId(selectedMenu.parent_id || null);
      setMenuId(selectedMenu.id);
      
      // Fetch the depth from the API
      axios.get(`http://127.0.0.1:8000/api/menus/${selectedMenu.id}/`)
        .then(response => {
          setDepth(response.data.depth);
        })
        .catch(error => {
          console.error('Error fetching menu depth:', error);
        });
    } else {
      resetForm();
    }
  }, [selectedMenu]);

  useEffect(() => {
    if (selectedSubmenu) {
      setName(selectedSubmenu.name);
      setParentId(selectedSubmenu.parent || null);
      setMenuId(selectedSubmenu.id);
      
      // Fetch the depth for the submenu as well
      axios.get(`http://127.0.0.1:8000/api/menus/${selectedSubmenu.id}/`)
        .then(response => {
          setDepth(response.data.depth);
        })
        .catch(error => {
          console.error('Error fetching submenu depth:', error);
        });
    }
  }, [selectedSubmenu]);

  const resetForm = () => {
    setName('');
    setParentId(null);
    setDepth(1);
    setMenuId(null);
  };


  const handleParentChange = async (event) => {
    const selectedParentId = event.target.value || null;
    setParentId(selectedParentId);
  
    if (selectedParentId) {
      try {
        // Fetch the selected parent menu details to get its depth
        const { data: parentMenu } = await axios.get(`http://127.0.0.1:8000/api/menus/${selectedParentId}/`);
        
        // Set depth based on the parent's depth
        if (parentMenu) {
          setDepth(parentMenu.depth + 1);
        } else {
          setDepth(1); // Default to 1 if no parent found
        }
      } catch (error) {
        console.error('Error fetching parent menu depth:', error);
        setDepth(1); // Fallback to depth 1 if there's an error
      }
    } else {
      setDepth(1); // Reset to 1 if no parent is selected
    }
  };
    

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (menuId) {
        // Update existing menu
        await axios.put(`http://127.0.0.1:8000/api/menus/${menuId}/`, { name, parent_id: parentId, depth });
      } else {
        // Add new menu
        await axios.post('http://127.0.0.1:8000/api/menus/', { name, parent_id: parentId, depth });
      }
      resetForm();
      onMenuAdded();
    } catch (error) {
      console.error('Error saving menu:', error);
    }
  };

  const renderMenuOptions = (menus, level = 0) => {
    return menus.map(menu => (
      <React.Fragment key={menu.id}>
        <option value={menu.id}>
          {'-'.repeat(level) + ' ' + menu.name}
        </option>
        {menu.children && renderMenuOptions(menu.children, level + 1)}
      </React.Fragment>
    ));
  };

  return (
    <div className="p-6 rounded-lg">
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

        {/* Parent Menu */}
        <div className="mb-4">
          <label htmlFor="parentId" className="block text-gray-700">Parent Menu</label>
          <select
            id="parentId"
            value={parentId || ''}
            onChange={handleParentChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">None</option>
            {renderMenuOptions(parentMenus)}
          </select>
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
