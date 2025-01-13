import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import TurnierDetail from "./components/TurnierDetail";
import Turniere from "./components/Turniere";
import TournamentOverview from "./components/TournamentOverview";
import TurnierKalender from "./components/Turnierkalender";
import KalenderTurnierSeite from "./components/KalenderTurnierSeite";
import Layout from "./components/Layout";
import EditTournament from "./components/EditTournament";
import Login from "./components/Login";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path={"/"} element={<Login/>}></Route>
                    <Route path="/tournaments" element={<Turniere />} />
                    <Route path="/form" element={<Form />} />
                    <Route path="/tournaments" element={<Turniere />} />
                    <Route path="/overview" element={<TournamentOverview />} />
                    <Route path="/tournament/:id" element={<TurnierDetail />} />
                    <Route path="/calendar" element={<TurnierKalender />} />
                    <Route path="/calendartournament" element={<KalenderTurnierSeite />} />
                    <Route path="/edit-tournament/:id" element={<EditTournament />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
