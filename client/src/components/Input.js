import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';


const Input = ({ setMessage, sendMessage, message, room, name }) => {

  const { theme } = useContext(ThemeContext);
  
  return(
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder={`${name?.toUpperCase()}, Welcome to the room ${room?.toUpperCase()}`}
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className={theme ? "sendButton" : "sendButton sendButtonDark"} onClick={e => sendMessage(e)}>Send</button>
  </form>
  )
}

export default Input;