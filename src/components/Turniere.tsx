import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import './styles/turnier.module.css'

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

const Turniere: React.FC = () => {
    const navigate = useNavigate();

  return (
    <div>
      {turniere.map(turnier => (
        <div key={turnier.id}>
          <h2>{turnier.name}</h2>
          <p><strong>Date:</strong> {turnier.date}</p>
          <p><strong>Location:</strong> {turnier.location}</p>
          <p><strong>Duration:</strong> {turnier.duration}</p>
          <button onClick={() => navigate(`/turnier/${turnier.id}`)}>Mehr Details</button>
        </div>
      ))}
    </div>
  );
};

export default Turniere;
