import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useRecoilState } from 'recoil';
import { openMenusState, selectedRootMenuState, selectedMenuState, selectedSubmenuState } from '../../state/menuState';
import MenuForm from '../organisms/MenuForm';

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

  if (isLoading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error loading menus: {error.message}</p>;
  if (!data || !Array.isArray(data)) return <p>No menus available</p>;

  const renderMenu = (menu, depth = 0, isLast = false, isRoot = false) => {
    const isOpen = openMenus[menu.id];
    const isSelectedRoot = selectedRootMenu === menu.id;
    const isFolder = menu.children && menu.children.length > 0;

    if (selectedRootMenu && menu.id !== selectedRootMenu && isRoot) return null;

    return (
      <li key={menu.id} className="relative">
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
        <h1 className="text-4xl mb-8 font-bold text-gray-800">Menus</h1>

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
    </div>
  );
};

export default MenusPage;
