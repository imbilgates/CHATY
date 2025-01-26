import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const [allRooms, setAllRooms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}/add-rooms`);
            if (response.data.rooms) { // Ensure response structure matches expected data
              setAllRooms(response.data.rooms);
            }
          } catch (err) {
            console.error(err);
          }
        };
    
        fetchData(); // Call the async function immediately
      }, []);

    return (
        <RoomContext.Provider value={{ allRooms, setAllRooms }}>
        {children}
        </RoomContext.Provider>
    );
};