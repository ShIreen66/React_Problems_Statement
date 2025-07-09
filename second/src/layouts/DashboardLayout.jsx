import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content area */}
      <main className="flex-grow p-4 bg-gray-100">
        <div className="max-w-6xl mx-auto w-full">
          <Outlet />
        </div>
      </main>

      {/* Footer (Optional) */}
      <footer className="bg-gray-800 text-white text-center p-2 mt-auto">
        © 2025 Admin Dashboard
      </footer>
    </div>
  );
};

export default DashboardLayout;
