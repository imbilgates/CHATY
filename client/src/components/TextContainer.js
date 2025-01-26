import React, { useContext } from 'react';
import { StyledBadge } from '../MUI/MaterialUIStyled';
import { Avatar } from '@mui/material';
import { ThemeContext } from '../context/ThemeContext';

const TextContainer = ({ users }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={!theme ? "textContainer" : "textContainer textContainerDark"}>
      <div>
        <h1>Realtime Chat Application <span role="img" aria-label="emoji">💬</span></h1>
        <h2>Created with React, Express, Node and Socket.IO <span role="img" aria-label="emoji">❤️</span></h2>
        <h2>Try it out right now! <span role="img" aria-label="emoji">⬅️</span></h2>
      </div>
      {
        users && users.length > 0 && (
          <div>
            <h1>People currently chatting:</h1>
            <div className="activeContainer">
              <div>
                {users.map(({ name, image }) => (
                  <div key={name} className="userContainer">
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                    >
                      <Avatar alt={name}>
                        <div
                          style={{ width: '100%', height: '100%' }}
                          dangerouslySetInnerHTML={{ __html: image }}
                        />
                      </Avatar>
                    </StyledBadge>
                    &nbsp;@{name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default TextContainer;