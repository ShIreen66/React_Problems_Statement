import * as Yup from 'yup';

export const userValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name should be at least 3 characters')
    .max(50, 'Name should not exceed 50 characters'),
  
  email: Yup.string()
    .required('Email is required')
    .email('Enter a valid email')
    .max(100, 'Email should not exceed 100 characters'),

  role: Yup.string()
    .required('Role is required')
    .oneOf(['admin', 'user'], 'Role must be either "admin" or "user"'),
});
