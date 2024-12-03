import {ITeam} from "../model/ITeam";

export const mockTeams: ITeam[] = [
    {
        name: "Real Madrid",
        players: 25,
        coach: "Carlo Ancelotti",
        founded: new Date('1902-03-06'),
        stadium: "Santiago Bernabéu Stadium"
    },
    {
        name: "FC Barcelona",
        players: 25,
        coach: "Xavi Hernández",
        founded: new Date('1899-11-29'),
        stadium: "Camp Nou"
    },
    {
        name: "Bayern München",
        players: 26,
        coach: "Thomas Tuchel",
        founded: new Date('1900-02-27'),
        stadium: "Allianz Arena"
    },
    {
        name: "Manchester United",
        players: 24,
        coach: "Erik ten Hag",
        founded: new Date('1878-03-05'),
        stadium: "Old Trafford"
    },
    {
        name: "Liverpool FC",
        players: 25,
        coach: "Jürgen Klopp",
        founded: new Date('1892-06-03'),
        stadium: "Anfield"
    },
    {
        name: "Paris Saint-Germain",
        players: 23,
        coach: "Luis Enrique",
        founded: new Date('1970-08-12'),
        stadium: "Parc des Princes"
    },
    {
        name: "Juventus",
        players: 25,
        coach: "Massimiliano Allegri",
        founded: new Date('1897-11-01'),
        stadium: "Allianz Stadium"
    },
    {
        name: "Chelsea FC",
        players: 24,
        coach: "Mauricio Pochettino",
        founded: new Date('1905-03-10'),
        stadium: "Stamford Bridge"
    }
];
