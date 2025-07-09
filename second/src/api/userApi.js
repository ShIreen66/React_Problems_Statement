const dummyUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user' },
  { id: 2, name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  { id: 3, name: 'Priya Sharma', email: 'priya.sharma@example.com', role: 'user' },
  { id: 4, name: 'Ravi Kumar', email: 'ravi.kumar@example.com', role: 'user' },
  { id: 5, name: 'Amit Singh', email: 'amit.singh@example.com', role: 'user' },
  { id: 6, name: 'Sara Ali', email: 'sara.ali@example.com', role: 'user' },
  { id: 7, name: 'Neha Verma', email: 'neha.verma@example.com', role: 'user' },
  { id: 8, name: 'Vikas Gupta', email: 'vikas.gupta@example.com', role: 'user' },
  { id: 9, name: 'Simran Kaur', email: 'simran.kaur@example.com', role: 'user' },
  { id: 10, name: 'Rahul Jain', email: 'rahul.jain@example.com', role: 'user' },
];

export const getUsers = async () => {
  return new Promise((res) => setTimeout(() => res(dummyUsers), 500));
};
