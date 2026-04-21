import { useEffect, useState } from 'react';
import { apiService } from '../services/api';

export const Profile = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    apiService.getProfile().then(res => setData(res));
  }, []);

  if (!data) return <p>Chargement...</p>;

  return (
    <div>
      <h1>{data.message}</h1>
      <pre>{JSON.stringify(data.user, null, 2)}</pre>
    </div>
  );
};