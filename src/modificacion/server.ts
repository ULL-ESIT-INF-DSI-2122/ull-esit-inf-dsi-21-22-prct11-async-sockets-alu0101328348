
// import {spawn} from 'child_process';
import * as net from 'net';
import {ServerMod} from './serverEventEmitter';


net.createServer((socket: net.Socket) => {
  const server: ServerMod = new ServerMod(socket);
  server.run();
}).listen(60300, () => {
  console.log('Waiting for clients to connect...');
});
