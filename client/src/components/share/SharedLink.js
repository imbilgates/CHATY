import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Box from '@mui/material/Box';
import { CustomTextField } from '../../MUI/MaterialUIStyled';
import { Alert, Button, Stack } from '@mui/material';
import axios from 'axios';

const SharedLink = () => {
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const { setUser, error, setError } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const roomURL = `${location.pathname.split('/')[2]}`;

  const handleSubmit = async () => {
    if (username && roomURL) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}/check-username`, { name: username, room: roomURL });
        if (response.data.available) {
          setUser({ username, roomURL });
          localStorage.setItem('name', username);
          localStorage.setItem('room', roomURL);
          localStorage.setItem('photo', avatar); // Save avatar SVG to localStorage
          navigate('/chat');
          setError('');
        } else {
          setError({ nameError: 'The username is taken.' });
        }
      } catch (err) {
        console.error(err);
        setError({ nameError: 'An error occurred. Please try again.' });
      }
    } else {
      setError({ nameError: 'Enter a name' });
    }
  };

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

  // Fetch avatar when username changes
  useEffect(() => {
    fetchAvatar(username);
  }, [username]);

  return (
    <div className="App">
      <div className="joinChatContainer">
        {error.nameError && (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">{error.roomError || error.nameError}</Alert>
          </Stack>
        )}
        <h3> Room <b style={{ color: 'blue' }}>{roomURL?.toLocaleUpperCase()}</b></h3>
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
              placeholder="username"
              id="standard-error-helper-text"
              label="Name"
              value={username}
              helperText={error.nameError}
              variant="standard"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>
        </div>
        <br />
        <Stack spacing={2}>
          <Button
            variant={error.nameError || error.roomError ? 'outlined' : 'contained'}
            color={error.nameError || error.roomError ? 'error' : 'success'}
            type="submit"
            onClick={handleSubmit}
          >
            Join
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default SharedLink;
