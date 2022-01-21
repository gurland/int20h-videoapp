import React from 'react';
import './Header.scss';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import Button from '@mui/material/Button';

function Header() {
    return (
        <div className="navbar">
            <div className="group">
                <h1>Title</h1>
            </div>
            <div className="group">
                <Button variant="contained">Create room</Button>
                <Brightness1Icon sx={{ fontSize: 40 }} />
            </div>
        </div>
    );
}

export default Header;
