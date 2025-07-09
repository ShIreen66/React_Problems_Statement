import React, { useState, useMemo } from 'react';
import { useUserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

const ROWS_PER_PAGE = 5;

const UserTable = ({ users = [], isAdmin = false, onView }) => {
  const { deleteUser } = useUserContext();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // Filter users by search
  const filteredUsers = useMemo(() => {
    return users.filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / ROWS_PER_PAGE) || 1;
  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return filteredUsers.slice(start, start + ROWS_PER_PAGE);
  }, [filteredUsers, page]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id);
      toast.success('User deleted');
    }
  };

  const handlePrev = () => setPage(p => Math.max(1, p - 1));
  const handleNext = () => setPage(p => Math.min(totalPages, p + 1));

  // Reset to page 1 if search changes
  React.useEffect(() => { setPage(1); }, [search]);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <span className="text-sm text-gray-500">{filteredUsers.length} users found</span>
      </div>
      <table className="table-auto w-full mt-2 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            {isAdmin && <th className="px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.length === 0 ? (
            <tr>
              <td colSpan={isAdmin ? 4 : 3} className="text-center py-4">No users found.</td>
            </tr>
          ) : (
            paginatedUsers.map(u => (
              <tr key={u.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 cursor-pointer underline text-blue-600" onClick={() => onView && onView(u)} title="View user details">{u.name}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">{u.role}</td>
                {isAdmin && (
                  <td className="px-4 py-2">
                    <button onClick={() => handleDelete(u.id)} className="text-red-500 hover:underline mr-2">Delete</button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
