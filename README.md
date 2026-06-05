# Video Call App

This is a real-time anonymous light weight video call application that allows users to create and join video meetings without needing to create an account. It's built with modern web technologies to provide a seamless and fast user experience. Inspired by google meet.

## Features

- **Anonymous Usage:** No login or registration required.
- **Create Rooms:** Instantly create a new video call room with a unique ID.
- **Join Rooms:** Join an existing room using its ID.
- **Real-time Communication:** High-quality video and audio streaming.
- **Media Controls:** Mute/unmute your microphone and turn your camera on/off.
- **Responsive Design:** Works on all devices.
- **Copy Room ID:** Easily copy the room ID to share with others.

## Tech Stack

- **Frontend:**
  - [Next.js](https://nextjs.org/) - React framework for server-rendered applications.
  - [Socket.IO Client](https://socket.io/docs/v4/client-api/) - For real-time, bidirectional and event-based communication.
  - [PeerJS](https://peerjs.com/) - For WebRTC-based peer-to-peer data and media streams.
  - [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
  - [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.

- **Backend:**
  - [Node.js](https://nodejs.org/) - JavaScript runtime environment.
  - [Socket.IO](https://socket.io/) - For handling real-time WebSocket connections.
  - (Next.js API routes are used for signaling and server-side logic).

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14 or later)
- [npm](https://www.npmjs.com/get-npm)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/SiddharthaSarkar1/google-meet-clone.git
    cd your-repo-name
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

### Running the Application

1.  **Start the development server:**

    ```bash
    npm run dev
    ```

2.  **Open your browser:**

    Navigate to `http://localhost:3000`.

## Usage

1.  **Create a Room:**
    - Click on the "Create a new room" button.
    - You will be redirected to a new room with a unique ID.
    - Share the room ID or the URL with others to invite them.

2.  **Join a Room:**
    - Enter the Room ID in the input field.
    - Click the "Join Room" button.

## Screenshots

**Home Page:**
![Home Page](<demo-img/video-calling-app.png>)
