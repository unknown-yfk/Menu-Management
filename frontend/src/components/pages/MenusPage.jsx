

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FiChevronDown, FiChevronUp, FiPlus, FiEdit, FiTrash } from 'react-icons/fi';
import { useRecoilState } from 'recoil';
import { openMenusState, selectedRootMenuState, selectedMenuState, selectedSubmenuState } from '../../state/menuState';
import MenuForm from '../organisms/MenuForm';
import { BsGridFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { CiFolderOn } from 'react-icons/ci';

const fetchMenus = async () => {
  const { data } = await axios.get('http://127.0.0.1:8000/api/menus/');
  return data;
};

const MenusPage = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['menus'],
    queryFn: fetchMenus,
  });

  const [openMenus, setOpenMenus] = useRecoilState(openMenusState);
  const [selectedRootMenu, setSelectedRootMenu] = useRecoilState(selectedRootMenuState);
  const [selectedMenu, setSelectedMenu] = useRecoilState(selectedMenuState);
  const [selectedSubmenu, setSelectedSubmenu] = useRecoilState(selectedSubmenuState);

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    menu: null,
  });

  const toggleCollapse = (id, isRoot, parent = null, name = '') => {
    if (isRoot) {
      setSelectedRootMenu((prev) => (prev === id ? '' : id));
      setOpenMenus({});
      setSelectedSubmenu(null);
    } else {
      setOpenMenus((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
      setSelectedSubmenu({ id, parent, name });
    }
  };

  const handleSelectChange = (event) => {
    const selectedMenuId = event.target.value;
    setSelectedRootMenu(selectedMenuId);
    setOpenMenus({});

    if (selectedMenuId) {
      const menu = data.find(menu => menu.id === selectedMenuId);
      setSelectedMenu(menu);
    } else {
      setSelectedMenu(null);
    }
  };

  const handleMenuAdded = () => {
    refetch();
  };

  const handleContextMenu = (event, menu) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      menu,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };

  const handleAddMenu = () => {
    setSelectedMenu(contextMenu.menu);
    setSelectedSubmenu(null);
    handleCloseContextMenu();
  };

  const handleUpdateMenu = () => {
    setSelectedMenu(contextMenu.menu);
    setSelectedSubmenu(null);
    handleCloseContextMenu();
  };

  const handleDeleteMenu = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/menus/${contextMenu.menu.id}`);
      refetch();
    } catch (error) {
      console.error("Failed to delete menu:", error);
    }
    handleCloseContextMenu();
  };

  if (isLoading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error loading menus: {error.message}</p>;
  if (!data || !Array.isArray(data)) return <p>No menus available</p>;

  const renderMenu = (menu, depth = 0, isLast = false, isRoot = false) => {
    const isOpen = openMenus[menu.id];
    const isSelectedRoot = selectedRootMenu === menu.id;
    const isFolder = menu.children && menu.children.length > 0;

    if (selectedRootMenu && menu.id !== selectedRootMenu && isRoot) return null;

    return (
      <li
        key={menu.id}
        className="relative"
        onContextMenu={(e) => handleContextMenu(e, menu)}
      >
        <div
          className="flex items-center cursor-pointer"
          style={{ paddingLeft: `${depth * 20}px` }}
          onClick={() => toggleCollapse(menu.id, isRoot, menu.parent, menu.name)}
        >
          {isFolder && (
            <>
              {isRoot && isSelectedRoot ? (
                <FiChevronDown className="mr-2 text-gray-600" />
              ) : isRoot ? (
                <FiChevronUp className="mr-2 text-gray-600" />
              ) : isOpen ? (
                <FiChevronDown className="mr-2 text-gray-600" />
              ) : (
                <FiChevronUp className="mr-2 text-gray-600" />
              )}
            </>
          )}
          <span className="text-gray-800">{menu.name}</span>
        </div>

        {isRoot && isSelectedRoot && isFolder && (
          <ul className="pl-4">
            {menu.children.map((child, index) =>
              renderMenu(child, depth + 1, index === menu.children.length - 1)
            )}
          </ul>
        )}

        {!isRoot && isFolder && isOpen && (
          <ul className="pl-4">
            {menu.children.map((child, index) =>
              renderMenu(child, depth + 1, index === menu.children.length - 1)
            )}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row p-6 bg-gray-50 min-h-screen">
      <div className="flex-1 mb-8 lg:mb-0 lg:mr-16">

      <div className="flex items-center text-gray-700 mb-4">
      <div className="flex items-center"> 
        <Link to="/" className="text-blue-600 hover:text-blue-800"><CiFolderOn /></Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to="/menus" className="text-gray-600 hover:text-gray-800">Menus</Link>
      </div>
    </div>
      <div className="flex items-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800 flex  pr-4">Menus</h1>
      <div className="bg-blue-600 p-3 rounded-full"> {/* Circular background */}
        <BsGridFill className="text-4xl text-white" />
      </div>
    </div>        


        <select
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          onChange={handleSelectChange}
          value={selectedRootMenu}
        >
          <option value="">Show All</option>
          {data.map((menu) => (
            <option key={menu.id} value={menu.id}>
              {menu.name}
            </option>
          ))}
        </select>

        <ul className="list-none">
          {data.map((menu, index) => renderMenu(menu, 0, index === data.length - 1, true))}
        </ul>
      </div>
      <div className="w-full lg:w-80">
        <MenuForm 
          onMenuAdded={handleMenuAdded} 
          selectedMenu={selectedMenu} 
          selectedSubmenu={selectedSubmenu} 
        />
      </div>

      {/* Context Menu */}
      {contextMenu.visible && (
        <div
          className="absolute bg-white border border-gray-300 shadow-lg rounded"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
        
          <button
            className="w-full px-4 py-2 text-red-600 hover:bg-red-100 flex items-center"
            onClick={handleDeleteMenu}
          >
            <FiTrash className="mr-2" /> Delete Menu
          </button>
        </div>
      )}
    </div>
  );
};

export default MenusPage;
