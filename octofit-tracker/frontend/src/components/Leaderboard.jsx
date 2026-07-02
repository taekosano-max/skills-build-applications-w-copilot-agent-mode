import { useEffect, useState } from 'react';
import { normalizeCollection } from '../lib/api';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const apiUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`
          : 'http://localhost:8000/api/leaderboard';
        const response = await fetch(apiUrl);
        const payload = await response.json();
        setEntries(normalizeCollection(payload, 'leaderboard'));
      } catch (err) {
        setError('Unable to load leaderboard right now.');
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  if (loading) return <p>Loading leaderboard…</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul className="list-group">
        {entries.map((entry) => (
          <li key={entry._id || entry.rank} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <strong>#{entry.rank || 0}</strong> {entry.user?.name || entry.name}
            </span>
            <span>{entry.points || 0} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
