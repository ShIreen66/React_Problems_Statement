export const isAdmin = (user) => {
  return !!user && user.role === 'admin';
};

export const hasRole = (user, role) => {
  return !!user && user.role === role;
};

export const canEditUser = (user) => {
  // Only Admins can edit users
  return isAdmin(user);
};

export const canDeleteUser = (user) => {
  // Only Admins can delete users
  return isAdmin(user);
};

export const canViewUserDetails = (user) => {
  // Both admin and normal users can view details
  return !!user;
};
