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
        })
    }
    res.end();
}

export default SocketHandler;