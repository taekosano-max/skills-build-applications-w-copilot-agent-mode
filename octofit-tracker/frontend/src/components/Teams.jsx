import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../lib/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
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
