import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteTournament, getAllTournaments } from "../axios/tournamentService";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { LuFilter } from "react-icons/lu";
import { ITournament } from "../model/ITournament";
import "../Tournament.css";
import {IUser} from "../model/IUser";
import {decodeToken} from "../util/util.jwt";


const getUniqueSortedValues = (array: string[]) => {
  return Array.from(new Set(array)).sort();
};

const Turniere: React.FC = () => {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState<ITournament[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [sortOption, setSortOption] = useState("dateAsc");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setUser(decodeToken(token).user);
    }
    const fetchTournaments = async () => {
      try {
        const data = await getAllTournaments();
        setTournaments(data);
      } catch (error) {
        console.error("Fehler beim Laden der Turniere:", error);
      }
    };

    fetchTournaments();
  }, []);

  useEffect(() => {
    if (user) {
      setIsAdmin(user.role === 'admin');
    }
  }, [user]);

  const handleDelete = async (id: string) => {
    try {
      await deleteTournament(id);
      const updatedTournaments = tournaments.filter((t) => t._id !== id);
      setTournaments(updatedTournaments);
      console.log("Turnier erfolgreich gelöscht:", id);
    } catch (error) {
      console.error("Fehler beim Löschen des Turniers:", error);
    }
  };

  const locations = getUniqueSortedValues(tournaments.map((t) => t.location));
  const durations = getUniqueSortedValues(tournaments.map((t) => t.duration));

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const location = event.target.value;
    setSelectedLocations((prev) =>
        prev.includes(location)
            ? prev.filter((item) => item !== location)
            : [...prev, location]
    );
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const duration = event.target.value;
    setSelectedDurations((prev) =>
        prev.includes(duration)
            ? prev.filter((item) => item !== duration)
            : [...prev, duration]
    );
  };

  const filteredTournaments = tournaments.filter((turnier) => {
    const locationMatch = selectedLocations.length === 0 || selectedLocations.includes(turnier.location);
    const durationMatch = selectedDurations.length === 0 || selectedDurations.includes(turnier.duration);
    return locationMatch && durationMatch;
  });

  const sortedTournaments = filteredTournaments.sort((a, b) => {
    if (sortOption === "dateAsc") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    if (sortOption === "dateDesc") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortOption === "nameAsc") {
      return a.name.localeCompare(b.name);
    }
    if (sortOption === "nameDesc") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  const handleFilterToggle = () => {
    console.log('Before toggle:', isFilterOpen);
    setIsFilterOpen((prev) => !prev);
    console.log('After toggle:', isFilterOpen);
  };

  return (
      <div className="tournament-list">
        <div className="sort-filter-container">
          <div className="sort-section">
            <label className={"sortname"} htmlFor="sort">Sortiere nach:</label>
            <select
                id="sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="dateAsc">Datum (älteres zuerst)</option>
              <option value="dateDesc">Datum (jüngeres zuerst)</option>
              <option value="nameAsc">Name (A-Z)</option>
              <option value="nameDesc">Name (Z-A)</option>
            </select>
          </div>

          <div className="filter-section">
            <button className="filter-toggle" onClick={handleFilterToggle}
            >
              <LuFilter />
            </button>

            {isFilterOpen && (
                <div className="filter-options">
                  {/* Veranstaltungsort Filter */}
                  <div className="filter-category">
                    <h3>Veranstaltungsort</h3>
                    <div className="checkbox-group">
                      {locations.map((location, index) => (
                          <div key={index}>
                            <input
                                type="checkbox"
                                id={location}
                                value={location}
                                checked={selectedLocations.includes(location)}
                                onChange={handleLocationChange}
                            />
                            <label htmlFor={location}>{location}</label>
                          </div>
                      ))}
                    </div>
                  </div>

                  {/* Dauer Filter */}
                  <div className="filter-category">
                    <h3>Dauer</h3>
                    <div className="checkbox-group">
                      {durations.map((duration, index) => (
                          <div key={index}>
                            <input
                                type="checkbox"
                                id={duration}
                                value={duration}
                                checked={selectedDurations.includes(duration)}
                                onChange={handleDurationChange}
                            />
                            <label htmlFor={duration}>{duration}</label>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
            )}
          </div>
        </div>

        {sortedTournaments.map((turnier) => (
            <div key={turnier._id} className="tournament-list-item">
              <h2>{turnier.name}</h2>

              {/* Buttons nur für Admins anzeigen */}
              {isAdmin && (
                  <>
                    <button
                        className={"edi"}
                        onClick={() => navigate(`/edit-tournament/${turnier._id}`)}
                    >
                      <GrEdit /> Bearbeiten
                    </button>
                    <button
                        className={"del"}
                        onClick={() => handleDelete(turnier._id)}
                    >
                      <MdDelete /> Löschen
                    </button>
                  </>
              )}

              <p id={"datum"}><strong>Datum:</strong> {new Date(turnier.date).toLocaleDateString()}</p>
              <p id={"ort"}><strong>Veranstaltungsort:</strong> {turnier.location}</p>
              <p id={"dauer"}><strong>Dauer:</strong> {turnier.duration}</p>
              <button
                  type="submit"
                  onClick={() => navigate(`/tournament/${turnier._id}`)}
              >
                Mehr Details
              </button>
            </div>
        ))}
      </div>
  );
};

export default Turniere;
