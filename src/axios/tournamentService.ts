import axios from 'axios';

const BASE_URL = 'https://kavolley.uber.space/api/tournaments/';
//const BASE_URL = 'http://localhost:4000/api/tournaments/';

export const getAllTournaments = async (queryParams = "") => {
    const response = await axios.get(`/tournaments?${queryParams}`);
    return response.data;
};

export const deleteTournament = async (id: string) => {
    try {
        const response = await axios.delete(`${BASE_URL}${id}`); // DELETE Anfrage an den Server
        return response.data;
    } catch (error) {
        console.error('Error deleting tournament:', error);
        throw error;
    }
};

export const getTournamentById = async (id: string) => {
    try {
        const response = await axios.get(`${BASE_URL}${id}`); // Verwende die MongoDB-ID als String
        return response.data;
    } catch (error) {
        console.error('Error fetching tournament by ID:', error);
        throw error; // Fehler propagieren, um ihn im Aufrufer zu behandeln
    }
};

export const updateTournament = async (id: string, updatedData: any) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${id}`, updatedData); // Verwende PATCH
        return response.data;
    } catch (error) {
        console.error('Error updating tournament:', error);
        throw error;
    }
};

export const createTournament = async (tournamentData: any) => {
    try {
        const response = await axios.post(BASE_URL, tournamentData);
        return response.data; // Rückgabe der Antwort vom Server
    } catch (error) {
        console.error('Error creating tournament:', error);
        throw error; // Fehler propagieren
    }
};
