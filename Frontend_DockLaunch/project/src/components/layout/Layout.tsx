import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingBackground from './FloatingBackground';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <FloatingBackground />
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;