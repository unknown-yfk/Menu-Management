    // src/components/organisms/Sidenav.js
    import { useState } from 'react';
    import { AiOutlineMenu, AiOutlineClose, AiOutlineHome, AiOutlineSetting, AiOutlineMenuFold } from 'react-icons/ai';
    import { FiList, FiMenu, FiUsers } from 'react-icons/fi';
    import { CiFolderOn } from "react-icons/ci";
    import { TfiViewGrid } from "react-icons/tfi";

    
    import { MdLineStyle, MdList, MdListAlt, MdOutlineMenuBook } from 'react-icons/md';
    import { Link } from 'react-router-dom';

    const Sidenav = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`bg-gray-800 text-white ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 rounded-3xl`}>
        <div className="flex justify-between p-4">
            <h5 className={`${isCollapsed ? 'hidden' : 'block'} text-lg`}>CLOIT</h5>
            <button onClick={toggleCollapse}>
            {isCollapsed ? <AiOutlineMenu size={24} /> : <AiOutlineMenuFold size={24} />}
            </button>
        </div>
        <nav className="mt-4">
    <div className="menu-container p-8">  {/* Add this div */}
        <ul>

        <div className="bg-gray-600 p-2 rounded-lg">  {/* Adds a light gray background */}

           
            <li className="p-2 hover:bg-gray-700 flex items-center">
                <CiFolderOn className="mr-2" />
                <Link to="/home" className={`${isCollapsed ? 'hidden' : 'block'}`}>Systems</Link>
            </li>
            <li className="p-2 hover:bg-gray-700 flex items-center">
                <TfiViewGrid className="mr-2" />
                <Link to="/home" className={`${isCollapsed ? 'hidden' : 'block'}`}>SystemCode</Link>
            </li>
            <li className="p-2 hover:bg-gray-700 flex items-center">
                <TfiViewGrid className="mr-2" />
                <Link to="/home" className={`${isCollapsed ? 'hidden' : 'block'}`}>Properties</Link>
            </li>
            <li className="p-2 hover:bg-gray-700 flex items-center">
                <MdListAlt  className="mr-2" />
                <Link to="/menus" className={`${isCollapsed ? 'hidden' : 'block'}`}>Menus</Link>
            </li>
            <li className="p-2 hover:bg-gray-700 flex items-center">
                <TfiViewGrid className="mr-2" />
                <Link to="/users" className={`${isCollapsed ? 'hidden' : 'block'}`}>APIList</Link>
            </li>
            </div>
            <li className="p-2 hover:bg-gray-700 flex items-center">
                <CiFolderOn className="mr-2" />
                <Link to="/settings" className={`${isCollapsed ? 'hidden' : 'block'}`}>Users&Group</Link>
            </li>
            <li className="p-2 hover:bg-gray-700 flex items-center">
                <CiFolderOn className="mr-2" />
                <Link to="/settings" className={`${isCollapsed ? 'hidden' : 'block'}`}>Competition</Link>
            </li>
            {/* Add more menu items here */}
        </ul>
    </div>
    
</nav>

        </div>
    );
    };

    export default Sidenav;
