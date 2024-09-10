import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'path';
import path from 'path';
import { Server } from 'socket.io';
import  bodyParser from "body-parser"
import { markAsUntransferable } from 'node:worker_threads';


const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {}
});

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

const users = new Map()
var numOfUsers = 0;

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public\\index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {

        io.emit('chat message', users.get(socket.id) + ": " + msg)
        console.log('message: ' + msg);
      });


      socket.on('question', (msg)=>{
        var sender = "";
        if (Math.floor(Math.random()*2) == 0){
          sender = users.get(socket.id);
        }
        else{
          sender = "unkown"
        }
        io.emit('question_asked', [msg, sender] );

      })

      socket.on('user-joined', (msg) => {
        users.set(socket.id ,msg);
        numOfUsers +=1;

        socket.broadcast.emit('chat message', msg + ' has joined')
        console.log('message: ' + msg);
      });

      
    
    socket.on('disconnect', (socket) => {
      console.log('user disconnected');
      numOfUsers -=1;
      users.delete(socket.id)
      console.log(socket.id +  "has left")
    });
  });


  io.on('disconnect', (socket)=>{
    io.emit('user-disconnect', "user disconnected")
  })

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});