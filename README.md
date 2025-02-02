# Realtime Chat Application 💬

A real-time chat application built with **React, Express, Node.js, Socket.IO, and Firebase** ❤️.

## Features 🚀
- **Join and create rooms**: Users can create and share chat rooms via WhatsApp.
- **See available rooms**: A list of active rooms is displayed for easy access.
- **Real-time messaging**: Instant communication using WebSockets.
- **Random profile pictures**: Users get unique avatars based on their name using [Multiavatar](https://multiavatar.com/).
- **Mobile-friendly UI**: Responsive design for smooth chatting on any device.

## Tech Stack 🛠️
- **Frontend**: React, React Router, MUI, Styled Components
- **Backend**: Express, Socket.IO
- **Database & Auth**: Firebase
- **Others**: UUID, Axios, Multiavatar API

## Installation 🏗️
1. Clone the repository:
   ```bash
   git clone https://github.com/imbilgates/CHATY
   cd CHATY
   ```
2. Install dependencies:
   ```bash
   npm install
   cd client && npm install 
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage 📌
- **Join a room**: Enter a room name or click on an available room.
- **Share a room**: Copy the room link and send it via WhatsApp.
- **Start chatting**: Messages appear in real-time.
- **Avatar generation**: Users get a unique avatar based on their name.

## How to Share a Room 🔗
Each room has a unique URL. Click the **Share Room** button to send it via WhatsApp:
```bash
https://chaty-6e5m.onrender.com/roomID
```
When a user clicks the link, they directly join the chat room.

## API References 📖
- **Multiavatar API** (for profile pictures):
  ```bash
  https://api.multiavatar.com/{username}.svg
  ```
- **Firebase Auth** for user authentication.

## License 📜
This project is licensed under the MIT License.

---
💡 **Contributions Welcome!** If you'd like to improve this project, feel free to fork and submit a pull request. 🎉

