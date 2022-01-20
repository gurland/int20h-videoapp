import React from 'react';
import { Routes as BrowserRoutes, Route } from 'react-router-dom';
import { Routes } from './constants/routes';
import Homepage from './pages/Homepage';
import Room from './pages/Room';

function App() {
    return (
        <div className="app">
            <BrowserRoutes>
                <Route path={Routes.Homepage} element={<Homepage />} />
                <Route path={Routes.Room} element={<Room />} />
            </BrowserRoutes>
        </div>
    );
}

export default App;
