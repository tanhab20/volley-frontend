import {ITournament} from "../model/ITournament";

export const mockTournaments: ITournament[] = [
    {
        id: 1,
        name: 'Sommerfußball-Cup 2024',
        date: new Date('2024-07-15'),
        location: 'Berlin, Olympiastadion',
        duration: '3 days',
        description: 'A summer football tournament held in Berlin for local and international teams.',
    },
    {
        id: 2,
        name: 'Internationales Schachturnier',
        date: new Date('2024-03-22'),
        location: 'Hamburg, Messehalle',
        duration: '2 days',
        description: 'An international chess tournament bringing together grandmasters from around the world.',
    },
    {
        id: 3,
        name: 'Tennis Masters 2024',
        date: new Date('2024-08-10'),
        location: 'München, Tennis Club Rot-Weiß',
        duration: '5 days',
        description: 'A prestigious tennis event hosted by Tennis Club Rot-Weiß in Munich.',
    },
    {
        id: 4,
        name: 'Schulmeisterschaften im Basketball',
        date: new Date('2024-05-30'),
        location: 'Köln, Sporthalle am Rhein',
        duration: '1 day',
        description: 'School basketball championships held at the Rhein sports hall in Cologne.',
    },
    {
        id: 5,
        name: 'Lauf für den guten Zweck',
        date: new Date('2024-09-12'),
        location: 'Frankfurt, Stadtpark',
        duration: '1 day',
        description: 'A charity run event organized in the city park of Frankfurt.',
    }
];
