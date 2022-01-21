import React from 'react';
import { useParams } from 'react-router-dom';

function Room() {
    const { roomId } = useParams();
    return <div>Room ID: {roomId}</div>;
}

export default Room;
