import { Server } from 'socket.io';

//Here we created the API's
const SocketHandler = (req, res) => {
    if(res.socket.server.io) {
        console.log('Socket already running!');
    }else {
        const io = new Server(res.socket.server);
        res.socket.server.io = io
    
        //Whenever a browser establishes a websocket connection at that time tis particular part would run
        io.on('connection', (socket) => {
            console.log('Server is connected!');
            socket.on('joined-room', (roomID, userId) => {
                console.log(`A new user with ${userId} joined room ${roomID}`);
                socket.join(roomID);
                socket.broadcast.to(roomID).emit('user-connected', userId);
            });

            socket.on('user-toggle-audio', (userId, roomId) => {
                socket.join(roomId);
                socket.broadcast.to(roomId).emit('user-toggle-audio', userId);
            })

            socket.on('user-toggle-video', (userId, roomId) => {
                socket.join(roomId);
                socket.broadcast.to(roomId).emit('user-toggle-video', userId);
            })

            socket.on('user-leave', (userId, roomId) => {
                socket.join(roomId);
                socket.broadcast.to(roomId).emit('user-leave', userId);
            })

        })
    }
    res.end();
}

export default SocketHandler;