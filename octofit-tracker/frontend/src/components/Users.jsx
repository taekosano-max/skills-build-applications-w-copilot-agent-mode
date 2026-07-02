import { useEffect, useState } from 'react';
import { normalizeCollection } from '../lib/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const apiUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users`
          : 'http://localhost:8000/api/users';
        const response = await fetch(apiUrl);
        const payload = await response.json();
        setUsers(normalizeCollection(payload, 'users'));
      } catch (err) {
        setError('Unable to load users right now.');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <p>Loading users…</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul className="list-group">
        {users.map((user) => (
          <li key={user._id || user.id} className="list-group-item">
            <strong>{user.name}</strong>
            <div className="text-muted">{user.email || user.location}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
