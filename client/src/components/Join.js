import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { Avatar, Backdrop, Button, Chip, CircularProgress, Stack } from '@mui/material';
import axios from 'axios';

import { RoomContext } from '../context/RoomContext';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState(''); // State to store fetched avatar SVG
  const { allRooms } = useContext(RoomContext);
  const { setUser, error, setError } = useContext(UserContext);
  const navigate = useNavigate();

  // Function to fetch and display the SVG avatar
  const fetchAvatar = async (name) => {
    if (!name) {
      setAvatar('');
      return;
    }

    const url = `https://api.multiavatar.com/${encodeURIComponent(name)}.svg`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const svg = await response.text();
      setAvatar(svg);
    } catch (error) {
      console.error('Error fetching the SVG:', error);
    }
  };

  // Handle input change for name
  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    fetchAvatar(newName);
  };

  const handleSubmit = async () => {
    setOpen(true);
    if (name && room) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}/check-username`, { name, room });
        if (response.data.available) {
          setUser({ name, room });
          localStorage.setItem('name', name);
          localStorage.setItem('room', room);
          localStorage.setItem('photo', avatar); // Save avatar SVG to localStorage
          navigate('/chat');
          setOpen(false);
          setError('');
        } else {
          setOpen(false);
          setError({ nameError: 'The username is taken.' });
        }
      } catch (err) {
        setOpen(false);
        console.error(err);
        setError({ nameError: 'An error occurred. Please try again.' });
      }
    } else {
      setOpen(false);
      let newError = { nameError: '', roomError: '' };
      if (name === '') {
        newError.nameError = 'Enter a name';
      }
      if (room === '') {
        newError.roomError = 'Enter a room';
      }
      setError(newError);
    }
  };

  return (
    <div className="App">
      <div className="joinChatContainer">
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="success"/> its may take more time...
        </Backdrop>
        <h3>Join A Chat</h3>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          {avatar ? (
            <div dangerouslySetInnerHTML={{ __html: avatar }} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          ) : (
            ""
          )}
        </div>
        <div>
          <Box>
            <CustomTextField
              error={!!error.nameError}
              placeholder="Name"
              id="standard-error-helper-text"
              label="Name"
              value={name}
              helperText={error.nameError}
              variant="standard"
              onChange={handleNameChange}
            />
          </Box><br />
          <Box>
            <CustomTextField
              error={!!error.roomError}
              placeholder="Room"
              id="standard-error-helper-text"
              label="Room"
              value={room}
              helperText={error.roomError}
              variant="standard"
              onChange={(e) => setRoom(e.target.value)}
            />
          </Box>
        </div><br />
        <Stack spacing={2}>
          <Button variant={error.nameError || error.roomError ? "outlined" : "contained"} color={error.nameError || error.roomError ? "error" : "success"} type="submit" onClick={handleSubmit}>
            Join
          </Button>
          <div className="room-container">
            {allRooms.map((room, index) => (
              <Link to={`/chat/${room}`} key={index} className="room-link">
                <div className="room-item">
                  <Stack direction="row" spacing={1}>
                    <Chip
                      avatar={<Avatar>{room[0].toUpperCase()}</Avatar>}
                      label={room?.toUpperCase()}
                      variant="outlined"
                    />
                  </Stack>
                </div>
              </Link>
            ))}
          </div>
        </Stack>
      </div>
    </div>
  );
};

export default Join;

const CustomTextField = styled(TextField)(({ theme, error }) => ({
  '& .MuiInput-underline:before': {
    borderBottomColor: error ? 'red' : 'green', // Normal state
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: error ? 'red' : 'green', // Focused state
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottomColor: error ? 'red' : 'green', // Hover state
  },
  '& .MuiInputLabel-root': {
    color: 'white', // Label color
  },
  '& .MuiInputBase-input': {
    color: 'white', // Input text color
  }
}));