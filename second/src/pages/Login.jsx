import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Invalid email'),
    password: Yup.string().required('Password is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    const dummyUser = {
      id: 1,
      name: data.email.includes('admin') ? 'Admin' : 'User',
      role: data.email.includes('admin') ? 'admin' : 'user',
      email: data.email
    };
    login(dummyUser);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 space-y-6 border border-gray-100 dark:border-gray-800">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2"> Login</h2>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1" htmlFor="email">Email</label>
          <input {...register('email')} id="email" placeholder="Email" className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-full bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1" htmlFor="password">Password</label>
          <input {...register('password')} id="password" type="password" placeholder="Password" className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-full bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>
        <button type="submit" className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg shadow transition">Login</button>
      </form>
    </div>
  );
};

export default Login;
