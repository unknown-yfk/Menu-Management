import { Routes, Route } from 'react-router-dom';
import Layout from './components/templates/Layout';
import MenusPage from './components/pages/MenusPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/menus" element={<MenusPage />} />
        {/* Add more routes here */}
      </Routes>
    </Layout>
  );
}

export default App;

