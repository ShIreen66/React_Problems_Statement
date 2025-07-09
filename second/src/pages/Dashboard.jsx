import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuthContext();

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome{user && user.name ? `, ${user.name}` : ''}!</h1>
      {user && user.role === 'admin' && (
        <Link to="/users" className="text-blue-500 underline">Go to User Management</Link>
      )}
    </div>
  );
};

export default Dashboard;
