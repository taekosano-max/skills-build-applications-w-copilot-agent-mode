import { useEffect, useState } from 'react';
import { getApiUrl, normalizeCollection } from '../lib/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(getApiUrl('workouts'));
        const payload = await response.json();
        setWorkouts(normalizeCollection(payload, 'workouts'));
      } catch (err) {
        setError('Unable to load workouts right now.');
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  if (loading) return <p>Loading workouts…</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Workouts</h2>
      <ul className="list-group">
        {workouts.map((workout) => (
          <li key={workout._id || workout.id} className="list-group-item">
            <strong>{workout.name}</strong>
            <div className="text-muted">{workout.category} • {workout.difficulty}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
