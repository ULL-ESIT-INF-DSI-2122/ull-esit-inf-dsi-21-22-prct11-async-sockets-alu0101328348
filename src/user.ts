import * as fs from 'fs';
import chalk from 'chalk';
import {Note} from "./note";
import {ResponseType} from './types';
import {printPartOfNoteByColor} from './printBycolor';
/**
 * Clase usuario
 */
export class User {
  /**
   * Constructor para un objeto tipo Usuario
   * @param {string} name Nombre del usuario
   */
  constructor(private readonly name: string) {}

  /**
   * Getter del nombre del usuario
   * @returns {string} Nombre
   */
  public getUser(): string {
    return this.name;
  }

  /**
   * Función para añadir una nota
   * @param {Note} newNote Nota a crear y añadir al directorio
   * @returns {ResponseType} Respuesta que devuelve el servidor para enviarlo al cliente
   */
  public addNote(newNote: Note): ResponseType {
    const path: string = './src/notes/' + this.name;
    const file: string = '/' + newNote.getName() + '.json';
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, {recursive: true});
    }
    const data = {"title": newNote.getName(), "body": newNote.getBody(), "color": newNote.getColor()};
    if (!fs.existsSync(path + file)) {
      console.log(chalk.green('El fichero se ha creado'));
      fs.writeFileSync(path + file, JSON.stringify(data));
      const peticion: ResponseType = {type: 'add', success: true, message: 'El fichero se ha creado'};

      return peticion;
    } else {
      console.log(chalk.red('Error: el fichero ya existe'));
      const err: ResponseType = {type: 'add', success: false, message: 'Error: el fichero ya existe'};

      return err;
    }
  }

  /**
   * Modifica el contenido del fichero de la nota existente
   * @param {Note} noteToModify Nota con el contenido modificado
   * @returns {ResponseType} Respuesta que devuelve el servidor para enviarlo al cliente
   */
  public modifyNote(noteToModify: Note): ResponseType {
    const path: string = './src/notes/' + this.name;
    const file: string = '/' + noteToModify.getName() + '.json';
    if (fs.existsSync(path)) {
      if (fs.existsSync(path + file)) {
        const data = {"title": noteToModify.getName(), "body": noteToModify.getBody(), "color": noteToModify.getColor()};
        fs.writeFileSync(path + file, JSON.stringify(data));
        console.log(chalk.green("El fichero se ha modificado"));
        const peticion: ResponseType = {type: 'modify', success: true, message: 'El fichero se ha modificado'};
        return peticion;
      } else {
        console.log(chalk.red('Error: el fichero no existe'));
        const err: ResponseType = {type: 'modify', success: false, message: 'Error: el fichero no existe'};
        return err;
      }
    } else {
      console.log(chalk.red("Error: el directorio no existe"));
      const err: ResponseType = {type: 'modify', success: false, message: 'Error: el directorio no existe'};
      return err;
    }
  }

  /**
   * función para eliminar una nota del directorio del usario
   * @param {string} titleNote Título de la nota
   * @returns {ResponseType} Respuesta que devuelve el servidor para enviarlo al cliente
   */
  public deleteNote(titleNote: string): ResponseType {
    const path: string = './src/notes/' + this.name;
    const file: string = '/' + titleNote + '.json';
    if (fs.existsSync(path)) {
      if (fs.existsSync(path + file)) {
        fs.rmSync(path + file);
        console.log(chalk.green("Nota eliminada!"));
        const peticion: ResponseType = {type: 'remove', success: true, message: 'Nota eliminada!'};
        return peticion;
      } else {
        console.log(chalk.red('Error: el fichero no existe'));
        const err: ResponseType = {type: 'remove', success: false, message: 'Error: el fichero no existe'};
        return err;
      }
    } else {
      console.log(chalk.red("Error: el directorio no existe"));
      const err2: ResponseType = {type: 'remove', success: false, message: 'Error: el directorio no existe'};
      return err2;
    }
  }

  /**
   * Método que muestra la información de la nota
   * @param {string} titleNote Título de la nota a leer y mostrar información
   * @returns {ResponseType} Respuesta que devuelve el servidor al cliente
   */
  public readNote(titleNote: string): ResponseType {
    const path: string = './src/notes/' + this.name;
    const file: string = '/' + titleNote + '.json';
    if (fs.existsSync(path)) {
      if (fs.existsSync(path + file)) {
        console.log(chalk.green("Nota leida!"));
        const data = JSON.parse(fs.readFileSync(path + file).toString());
        printPartOfNoteByColor(data.title, data.color);
        printPartOfNoteByColor(data.body, data.color);
        const peticion: ResponseType = {type: 'read', success: true, message: 'Nota leida!', dataJSON: data};
        return peticion;
      } else {
        console.log(chalk.red('Error: el fichero no existe'));
        const err: ResponseType = {type: 'read', success: false, message: 'Error: el fichero no existe'};
        return err;
      }
    } else {
      console.log(chalk.red("Error: El directorio no existe"));
      const err: ResponseType = {type: 'read', success: false, message: 'Error: El directorio no existe'};
      return err;
    }
  }

  /**
   * Método que muestra los ficheros .json del directorio del usuario
   * @returns {ResponseType} Respuesta que devuelve el servidor al cliente
   */
  public listNotes(): ResponseType {
    const path: string = './src/notes/' + this.name;
    if (fs.existsSync(path)) {
      const ficheros = fs.readdirSync(path);
      const datosJSON: any[] = [];
      ficheros.forEach((file) => {
        const readFile = fs.readFileSync(path + '/' + file);
        datosJSON.push(JSON.parse(readFile.toString()));
      });
      const peticion: ResponseType = {type: 'list', success: true, message: 'Tus notas:', arryJSON: datosJSON};
      return peticion;
    } else {
      console.log(chalk.red("No existe del directorio"));
      const err: ResponseType = {type: 'list', success: false, message: 'No existe del directorio'};
      return err;
    }
  }

  /**
   * Verifica que el color de la nota sea los
   * establecidos de la práctica
   * @param {string} color Color de la nota
   * @returns {boolean} True o False
   */
  public checkColor(color: string): boolean {
    const colorList: string[] = ['red', 'green', 'blue', 'yellow'];
    for (let i = 0; i < colorList.length; i++) {
      if (color === colorList[i]) {
        return true;
      }
    }
    return false;
  }
}
