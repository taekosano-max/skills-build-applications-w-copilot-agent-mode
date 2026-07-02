import { useEffect, useState } from 'react';
import { getApiUrl, normalizeCollection } from '../lib/api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(getApiUrl('activities'));
        const payload = await response.json();
        setActivities(normalizeCollection(payload, 'activities'));
      } catch (err) {
        setError('Unable to load activities right now.');
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  if (loading) return <p>Loading activities…</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Activities</h2>
      <ul className="list-group">
        {activities.map((activity) => (
          <li key={activity._id || activity.id} className="list-group-item">
            <strong>{activity.title || activity.type}</strong>
            <div className="text-muted">{activity.durationMinutes} min • {activity.calories} cal</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
