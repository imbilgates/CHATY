import React, { useState, useEffect, useContext, useRef } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import TextContainer from './TextContainer';
import Messages from './Messages';
import InfoBar from './InfoBar';
import Input from './Input';
import { ThemeContext } from '../context/ThemeContext';
import { db } from '../config/firebase-config';
import { doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const Chat = () => {
  const navigate = useNavigate();
  const { user, setUser, setError } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const name = localStorage.getItem('name');
  const room = localStorage.getItem('room');
  const image = localStorage.getItem('photo');
  const socket = useRef(null);

  useEffect(() => {
    if (!name || !room) {
      navigate('/');
    } else {
      setUser({ name, room, image });
      socket.current = io(ENDPOINT);

      socket.current.emit('join', { name, room, image }, (error) => {
        if (error) {
          const newError = { nameError: error, roomError: '' };
          setError(newError);
          navigate('/');
        }
      });

      // Set up real-time listener for Firestore messages
      const messagesRef = doc(db, 'rooms', room);
      const unsubscribe = onSnapshot(messagesRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const updatedMessages = docSnapshot.data().messages;
          setMessages(updatedMessages);
          setLoading(false);
        }
      });

      return () => {
        socket.current.disconnect();
        socket.current.off();
        unsubscribe(); // Clean up Firestore listener
      };
    }
  }, [name, room, image, navigate, setUser, setError]);

  useEffect(() => {
    const handleNewMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleRoomData = ({ users }) => {
      setUsers(users);
    };

    if (socket.current) {
      socket.current.on('message', handleNewMessage);
      socket.current.on('roomData', handleRoomData);

      return () => {
        socket.current.off('message', handleNewMessage);
        socket.current.off('roomData', handleRoomData);
      };
    }
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();

    if (message && socket.current) {
      socket.current.emit('sendMessage', message, () => {
        setMessage('');
        socket.current.emit('roomData', { room });

        // Update messages in Firestore (this will automatically update all clients)
        const Ref = doc(db, 'rooms', room);
        setDoc(Ref, {
          messages: [...messages, { user: name, text: message, image }]
        }, { merge: true });
      });
    }
  };

  const deleteMessages = async () => {
    const Ref = doc(db, 'rooms', room);
    await updateDoc(Ref, {
      messages: []
    });

    // No need to manually update messages state here; Firestore listener will handle it
  };

  return (
    <div className={theme ? "outerContainer" : "outerContainer outerContainerDark"}>
      <div className="container">
        <InfoBar room={user.room} users={users} name={user.name} image={image} deleteMessages={deleteMessages} />
        <Messages messages={messages} name={user.name} loading={loading} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} room={room} name={name}/>
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
