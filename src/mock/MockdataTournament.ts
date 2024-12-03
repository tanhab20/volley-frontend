import {ITournament} from "../model/ITournament";

const mockTournaments: ITournament[] = [
    {
        name: "Frühlingsturnier 2024",
        date: new Date("2024-05-15"),
        location: "Sporthalle A",
        duration: "2 Stunden",
        description: "Ein spannendes Turnier im Frühling mit vielen Teams."
    },
    {
        name: "Sommer-Cup 2024",
        date: new Date("2024-07-20"),
        location: "Stadion B",
        duration: "3 Stunden",
        description: "Der jährliche Sommer-Cup mit Wettbewerben in verschiedenen Sportarten."
    },
    {
        name: "Herbstmeisterschaft 2024",
        date: new Date("2024-09-30"),
        location: "KTL Kaindorf",
        duration: "4 Stunden",
        description: "Die Meisterschaft im Herbst, bei der die besten Teams gegeneinander antreten."
    },
    {
        name: "Winter-Wettkampf 2024",
        date: new Date("2024-12-10"),
        location: "Eisbahn C",
        duration: "5 Stunden",
        description: "Ein Wettkampf in verschiedenen Winterdisziplinen."
    },
    {
        name: "Neujahrsturnier 2025",
        date: new Date("2025-01-05"),
        location: "Halle D",
        duration: "3 Stunden",
        description: "Ein Turnier, um das neue Jahr sportlich zu beginnen."
    }
];
