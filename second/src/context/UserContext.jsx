import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUsers } from '../api/userApi';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
        localStorage.setItem('users', JSON.stringify(data)); // Overwrite localStorage every time
      } catch (e) {
        // Optionally handle error
      } finally {
        setLoading(false);
      }
    };
    fetchUsers(); // Always fetch from API on mount
  }, []);

  const deleteUser = (id) => setUsers(prev => {
    const updated = prev.filter(user => user.id !== id);
    localStorage.setItem('users', JSON.stringify(updated));
    return updated;
  });
  const updateUser = (updatedUser) => {
    setUsers(prev => {
      const updated = prev.map(u => u.id === updatedUser.id ? updatedUser : u);
      localStorage.setItem('users', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <UserContext.Provider value={{ users, loading, deleteUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
