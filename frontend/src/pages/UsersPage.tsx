// src/pages/UsersPage.tsx
import { useEffect, useState } from 'react';
import api from '../api/api';
import { User } from '../components/UserList';
import UserList from '../components/UserList';
import CreateUserForm from '../components/CreateUserForm';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get<User[]>('/users');
      setUsers(res.data);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <CreateUserForm onCreated={fetchUsers} />
      {loading ? <p>Loading…</p> : <UserList users={users} />}
    </div>
  );
}
