// src/components/UserList.tsx
import React from 'react';

export interface User {
  id: number;
  name: string;
}

interface Props {
  users: User[];
}

export default function UserList({ users }: Props) {
  if (users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <ul>
      {users.map(u => (
        <li key={u.id}>{u.name} (#{u.id})</li>
      ))}
    </ul>
  );
}
