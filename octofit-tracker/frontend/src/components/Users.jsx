import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../lib/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
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
