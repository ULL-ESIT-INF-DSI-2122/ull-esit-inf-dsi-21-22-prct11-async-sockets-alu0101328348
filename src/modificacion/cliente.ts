import EventEmitter from 'events';
import * as net from 'net';
import {CommandType} from '../types';
/**
 * Clase cliente de EventEmitter
 */
export class Client extends EventEmitter {
  /**
   * Constructor
   * @param {net.Socket} clientConnection socket
   */
  constructor(private clientConnection: net.Socket) {
    super();
    clientConnection.on('err', (err) => {
      console.log(err.message);
    });
  }

  /**
   * Gestión de eventos
   * @param comand comando
   * @param opciones opciones
   * @param file fichero o directorio
   */
  public run(comand: string, opciones: string, file: string) {
    this.clientConnection.on('err', (err) => {
      console.log(err.message);
    });
    let datos = '';
    this.clientConnection.on('data', (data) => {
      datos += data;
    });
    if (comand === 'cat') {
      const comando: CommandType = {type: 'cat', fichero: file, option: opciones};
      this.clientConnection.write(JSON.stringify(comando) + '\n');
      this.clientConnection.end();
    } else if (comand == 'ls') {
      const comando: CommandType = {type: 'ls', fichero: file, option: opciones};
      this.clientConnection.write(JSON.stringify(comando) + '\n');
      this.clientConnection.end();
    }

    this.clientConnection.on('end', () => {
      console.log(datos.toString());
    });

    this.clientConnection.on('close', () => {
      console.log(datos.toString());
    });
  }
}


const socket = net.connect({port: 60300});
const client: Client = new Client(socket);

client.run('cat', '-n', 'src/modificacion/prueba.txt');
// client.run('ls', '-l', './src/modificacion/');
