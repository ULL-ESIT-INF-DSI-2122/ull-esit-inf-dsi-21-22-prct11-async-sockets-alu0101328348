import {EventEmitter} from 'events';
import {spawn} from 'child_process';
import * as net from 'net';

/**
 * Clase del servidor EventEmitter
 */
export class ServerMod extends EventEmitter {
  /**
   * constructor
   * @param {net.Socket} serverConection socket
   */
  constructor(private serverConection: net.Socket) {
    super();
    serverConection.on('err', (err) => {
      console.log(err.message);
    });
  }

  /**
   * Gentión de evento
   */
  public run() {
    let datoEntero = '';
    this.serverConection.on('data', (trozosDatos) => {
      datoEntero += trozosDatos;
      this.emit('request', JSON.parse(datoEntero));
    });
    console.log(datoEntero.toString());
    console.log('A client has connected');

    this.serverConection.write('Connection established');

    this.serverConection.on('request', (request) => {
      if (request.type === 'cat') {
        const childCommand = spawn(request.type, [request.option, request.fichero]);
        let outOut = ' ';
        childCommand.stdout.on('data', (piece) => {
          outOut += piece;
        });

        childCommand.on('close', () => {
          this.serverConection.write('Datos: ' + outOut.toString());
          // this.serverConection.end();
        });
      }
    });

    this.serverConection.on('end', () => {
      console.log('A client has disconnected');
    });

    this.serverConection.on('close', () => {
      console.log('Close');
    });
  }
}

