import { useUserContext } from '../context/UserContext';
import UserTable from '../components/UserTable';
import { useAuthContext } from '../context/AuthContext';
import UserDetailsModal from '../components/userDetailsModal';
import React, { useState } from 'react';

const UserManagement = () => {
  const { users, loading } = useUserContext();
  const { isAdmin } = useAuthContext();
  const [selectedUser, setSelectedUser] = useState(null);

  if (loading) return <p>Loading users...</p>;

  // Debug: check users and pagination
  console.log('users:', users);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <UserTable users={users} isAdmin={isAdmin} onView={setSelectedUser} />
      {selectedUser && (
        <UserDetailsModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default UserManagement;
