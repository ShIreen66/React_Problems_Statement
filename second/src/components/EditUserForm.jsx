import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useUserContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import React, { useEffect } from 'react';

const EditUserForm = ({ user, onClose }) => {
  const { updateUser } = useUserContext();

  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    role: Yup.string().oneOf(['admin', 'user'], 'Role must be admin or user').required('Role is required'),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user.name || '',
      email: user.email || '',
      role: user.role || 'user',
    },
  });

  // Reset form values if user changes (for modal re-use)
  useEffect(() => {
    reset({
      name: user.name || '',
      email: user.email || '',
      role: user.role || 'user',
    });
  }, [user, reset]);

  const onSubmit = (data) => {
    const updatedUser = { ...user, ...data };
    updateUser(updatedUser);
    toast.success('User updated successfully!');
    onClose();
  };

  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 space-y-5 border border-gray-100 dark:border-gray-800">
        <h2 className="text-xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">Edit User</h2>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1" htmlFor="name">Name</label>
          <input {...register('name')} id="name" placeholder="Name" className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-full bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1" htmlFor="email">Email</label>
          <input {...register('email')} id="email" placeholder="Email" className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-full bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1" htmlFor="role">Role</label>
          <select {...register('role')} id="role" className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-full bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
        </div>
        <div className="flex justify-end space-x-2 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 border rounded bg-gray-100 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold shadow transition">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
