import React, { useState } from 'react';
import EditUserForm from './EditUserForm';
import { useAuthContext } from '../context/AuthContext';

const UserDetailsModal = ({ user, onClose }) => {
  const [editing, setEditing] = useState(false);
  const { isAdmin } = useAuthContext();
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full relative animate-fade-in transition-colors duration-300">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white text-xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        {editing ? (
          <EditUserForm user={user} onClose={() => setEditing(false)} />
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">User Details</h2>
            <div className="space-y-2">
              <div><span className="font-medium text-gray-700 dark:text-gray-200">Name:</span> <span className="break-all">{user.name || '-'}</span></div>
              <div><span className="font-medium text-gray-700 dark:text-gray-200">Email:</span> <span className="break-all">{user.email || '-'}</span></div>
              <div><span className="font-medium text-gray-700 dark:text-gray-200">Role:</span> {user.role || '-'}</div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
              {isAdmin && (
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600 transition w-full sm:w-auto"
                >
                  Edit
                </button>
              )}
              <button onClick={onClose} className="px-4 py-2 border rounded bg-gray-100 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition w-full sm:w-auto">Close</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDetailsModal;
