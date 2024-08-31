// src/components/templates/Layout.js
import Sidenav from '../organisms/Sidenav';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100 p-4">
      <Sidenav />
      <main className="flex-1 ml-4 p-4 bg-white rounded-lg">
        {children}
      </main>
    </div>
  );
};

export default Layout;
