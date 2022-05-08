import chalk from 'chalk';
import {Client} from './clientClass';
import {RequestType} from './types';
import {User} from './user';
import * as yargs from 'yargs';


const cliente: Client = new Client(60300);

/**
 * Comando que permite añadir una nota
 */
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Content of the note',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color used to print the note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.user === 'string' &&
        typeof argv.body === 'string' && typeof argv.color === 'string') {
      const user = new User(argv.user);
      if (user.checkColor(argv.color)) {
        const request: RequestType = {type: 'add', user: `${argv.user}`,
          title: `${argv.title}`, body: `${argv.body}`, color: `${argv.color}`};
        cliente.run(request);
      } else {
        console.log(chalk.red("Color inválido"));
      }
    } else {
      console.log(chalk.red("Error: Argumentos inválidos"));
    }
  },
});

/**
 * Comando para elimnar una nota
 */
yargs.command({
  command: 'remove',
  describe: 'remove a new note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.user === 'string') {
      const request: RequestType = {type: 'remove', user: `${argv.user}`, title: `${argv.title}`};
      cliente.run(request);
    } else {
      console.log(chalk.red("Error: insuficiente argumentos"));
    }
  },
});

/**
 * Comando para modificar una nota
 */
yargs.command({
  command: 'modify',
  describe: 'Modify a new note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color used to print the note',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Content of the note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.user === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
      const user = new User(argv.user);
      if (user.checkColor(argv.color)) {
        const request: RequestType = {type: 'modify', user: `${argv.user}`,
          title: `${argv.title}`, body: `${argv.body}`, color: `${argv.color}`};
        cliente.run(request);
      } else {
        console.log(chalk.red("Color inválido"));
      }
    }
  },
});

/**
 * Comando para listar una nota del usuario
 */
yargs.command({
  command: 'list',
  describe: 'List a new note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      const request: RequestType = {type: 'list', user: `${argv.user}`};
      cliente.run(request);
    }
  },
});

/**
 * Comando para leer una nota
 */
yargs.command({
  command: 'read',
  describe: 'Read a new note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.user === 'string') {
      const request: RequestType = {type: 'read', user: `${argv.user}`, title: `${argv.title}`};
      cliente.run(request);
    }
  },
});

yargs.parse();
