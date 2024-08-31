    // src/components/organisms/Sidenav.js
    import { useState } from 'react';
    import { AiOutlineMenu, AiOutlineClose, AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';
    import { FiList, FiMenu, FiUsers } from 'react-icons/fi';
    import { MdLineStyle, MdList, MdListAlt, MdOutlineMenuBook } from 'react-icons/md';
    import { Link } from 'react-router-dom';

    const Sidenav = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`bg-gray-800 text-white ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 rounded-lg`}>
        <div className="flex justify-between p-4">
            <h1 className={`${isCollapsed ? 'hidden' : 'block'} text-lg`}>CLOIT</h1>
            <button onClick={toggleCollapse}>
            {isCollapsed ? <AiOutlineMenu size={24} /> : <AiOutlineClose size={24} />}
            </button>
        </div>
        <nav className="mt-4">
            <ul>
            <li className="p-2 hover:bg-gray-700 flex items-center">
                <AiOutlineHome className="mr-2" />
                <Link to="/home" className={`${isCollapsed ? 'hidden' : 'block'}`}>Home</Link>
            </li>
            <li className="p-2 hover:bg-gray-700 flex items-center">
                <MdListAlt  className="mr-2" />
                <Link to="/menus" className={`${isCollapsed ? 'hidden' : 'block'}`}>Menus</Link>
            </li>
            <li className="p-2 hover:bg-gray-700 flex items-center">
                <FiUsers className="mr-2" />
                <Link to="/users" className={`${isCollapsed ? 'hidden' : 'block'}`}>Users</Link>
            </li>
            <li className="p-2 hover:bg-gray-700 flex items-center">
                <AiOutlineSetting className="mr-2" />
                <Link to="/settings" className={`${isCollapsed ? 'hidden' : 'block'}`}>Settings</Link>
            </li>
            {/* Add more menu items here */}
            </ul>
        </nav>
        </div>
    );
    };

    export default Sidenav;
