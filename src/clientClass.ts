import {RequestType} from './types';
import * as net from 'net';
import {EventEmitter} from 'events';
import chalk from 'chalk';
import {printPartOfNoteByColor} from './printBycolor';

/**
 * Clase creadora del cliente
 */
export class Client extends EventEmitter {
  /**
   * Constructor
   * @param {number} port Número de puerto
   */
  constructor(private readonly port: number) {
    super();
  }

  /**
   * Ejecución del cliente
   * @param {RequestType} request Petición del cliente al servidor
   */
  public run(request: RequestType) {
    const sockeCliente = net.connect(this.port);

    let dataChunk = '';
    sockeCliente.on('data', (data) => {
      console.log(data.toString());
      dataChunk += data;
    });
    // se procesa la respuesta
    sockeCliente.on('end', () => {
      const json = JSON.parse(dataChunk);

      sockeCliente.emit('request', json);
    });

    // muestra por pantalla el contenido
    // de la respuesta del server
    sockeCliente.on('request', (request) => {
      if (request.type === 'add' || request.type === 'modify' ||
          request.type === 'remove') {
        if (request.success) {
          console.log(chalk.green(request.message));
        } else {
          console.log(chalk.red(request.message));
        }
      } else if (request.type === 'read') {
        if (request.success) {
          console.log(chalk.green(request.message));
          printPartOfNoteByColor(request.dataJSON.title, request.dataJSON.color);
          printPartOfNoteByColor(request.dataJSON.body, request.dataJSON.color);
        } else {
          console.log(chalk.red(request.message));
        }
      } else if (request.type === 'list') {
        if (request.success) {
          console.log(chalk.green(request.message));
          request.arryJSON.forEach((jsonData: any) => {
            printPartOfNoteByColor(jsonData.title, jsonData.color);
          });
        } else {
          console.log(chalk.red(request.message));
        }
      } else {
        console.log(chalk.red('Se produjo un error'));
      }
    });

    sockeCliente.on('close', () => {
      console.log(chalk.green('Desconexión con el servidor'));
    });

    sockeCliente.write(JSON.stringify(request) + '\n');
    sockeCliente.end();
  }
}
