import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Turnier {
  id: number;
  name: string;
  date: string;
  location: string;
  duration: string;
}

const turniere: Turnier[] = [
  { id: 1, name: 'Sommerfußball-Cup 2024', date: '15.7.2024', location: 'Berlin, Olympiastadion', duration: '3 days' },
  { id: 2, name: 'Internationales Schachturnier', date: '22.3.2024', location: 'Hamburg, Messehalle', duration: '2 days' },
  { id: 3, name: 'Tennis Masters 2024', date: '10.8.2024', location: 'München, Tennis Club Rot-Weiß', duration: '5 days' },
  { id: 4, name: 'Schulmeisterschaften im Basketball', date: '30.5.2024', location: 'Köln, Sporthalle am Rhein', duration: '1 day' },
  { id: 5, name: 'Lauf für den guten Zweck', date: '12.9.2024', location: 'Frankfurt, Stadtpark', duration: '1 day' },
];

const TurnierDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const turnier = turniere.find(t => t.id === parseInt(id!));

  const navigate = useNavigate();

  if (!turnier) {
    return <h2>Turnier nicht gefunden</h2>;
  }

  const handleEinschreiben = () => {
    alert(`Team für das Turnier ${turnier.name} eingeschrieben!`);
    navigate('/');
  };

  return (
    <div>
      <h2>{turnier.name}</h2>
      <p><strong>Date:</strong> {turnier.date}</p>
      <p><strong>Location:</strong> {turnier.location}</p>
      <p><strong>Duration:</strong> {turnier.duration}</p>
      <button onClick={handleEinschreiben}>Für Turnier einschreiben</button>
    </div>
  );
};

export default TurnierDetail;
