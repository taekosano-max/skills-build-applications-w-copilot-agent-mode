import { useEffect, useState } from 'react';
import { normalizeCollection } from '../lib/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const apiUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
          : 'http://localhost:8000/api/teams';
        const response = await fetch(apiUrl);
        const payload = await response.json();
        setTeams(normalizeCollection(payload, 'teams'));
      } catch (err) {
        setError('Unable to load teams right now.');
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  if (loading) return <p>Loading teams…</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Teams</h2>
      <ul className="list-group">
        {teams.map((team) => (
          <li key={team._id || team.id} className="list-group-item">
            <strong>{team.name}</strong>
            <div className="text-muted">{team.sport || team.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
