import React, { useContext } from 'react';
import { RoomContext } from '../../context/RoomContext';
import { Button } from '@mui/material'; // Import MUI Button

const AvailableRooms = () => {
    const { allRooms, fetchRooms } = useContext(RoomContext);

    return (
        <div>
            <h5 className="header">Available Rooms</h5>
            <Button variant="contained" color="primary" onClick={fetchRooms}>
                Refresh Rooms
            </Button>
            <div className="room-container">
                {allRooms.map((room, index) => (
                    <div key={index} className="room-item">{room}</div>
                ))}
            </div>
        </div>
    );
};

export default AvailableRooms;
