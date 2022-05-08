import {EventEmitter} from 'events';
import * as net from 'net';
import {listenerCount} from 'events';
import chalk from 'chalk';
import {Note} from './note';
import {User} from './user';
import {ResponseType} from './types';

/**
 * Clase creadora del servidor
 */
export class Server extends EventEmitter {
  /**
   * Constructor
   * @param {number} port Número de puerto
   */
  constructor(private readonly port: number) {
    super();
  }

  /**
   * Ejecución del servidor
   */
  public run(): void {
    const sockeT = net.createServer((socket) => {
      console.log(chalk.green('Se ha conectado un cliente'));
      socket.on('event', () => {});
      console.log(chalk.green('Numero de clientes conectados: ' + listenerCount(socket, 'event')));

      // se lee los datos que el cliente envía
      let datachunk = '';
      socket.on('data', (data) => {
        datachunk = data.toString();
      });

      socket.on('end', () => {
        console.log(chalk.green('Fin de datos de envío'));
        const json = JSON.parse(datachunk);
        const note: Note = new Note(json.title, json.color, json.body);
        const user: User = new User(json.user);
        switch (json.type) {
          case 'add':
            // deserializamos el json ResponseType que retorn ala función add
            const respuestaServerToClient: ResponseType = user.addNote(note);
            socket.emit('message', respuestaServerToClient); // emitimos un mensaje al socket del server
            // cerramos el socket
            socket.end();
            break;
          case 'modify':
            const respuestaModify: ResponseType = user.modifyNote(note);
            socket.emit('message', respuestaModify);
            socket.end();
            break;
          case 'remove':
            const respuestaDelete: ResponseType = user.deleteNote(note.getName());
            socket.emit('message', respuestaDelete);
            socket.end();
            break;
          case 'read':
            const respuestaRead: ResponseType = user.readNote(note.getName());
            socket.emit('message', respuestaRead);
            socket.end();
            break;
          case 'list':
            const respuestaList: ResponseType = user.listNotes();
            socket.emit('message', respuestaList);
            socket.end();
            break;
          default:
            break;
        }
      });

      // envía el mensaje
      socket.on('message', (message) => {
        socket.write(JSON.stringify(message) + '\n');
      });

      socket.on('error', (err) => {
        console.log(chalk.red(err.message));
      });

      socket.on('close', () => {
        console.log(chalk.green('El cliente se ha desconectado'));
      });
    });
    sockeT.listen(this.port, () => {
      console.log(chalk.green('Esperando a que un cliente se conecte...'));
    });
  }
}
