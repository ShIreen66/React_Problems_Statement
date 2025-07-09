import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useAuthContext();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white dark:bg-gray-900 dark:text-gray-100">
      <div>
        <Link to="/dashboard" className="mr-4">Dashboard</Link>
        {user && user.role === 'admin' && (
          <Link to="/users" className="mr-4">User Management</Link>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="px-2 py-1 border rounded bg-gray-700 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-700 transition"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
        {user ? (
          <>
            <span>{user.name} ({user.role})</span>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <Link to="/login" className="bg-blue-500 px-3 py-1 rounded">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
