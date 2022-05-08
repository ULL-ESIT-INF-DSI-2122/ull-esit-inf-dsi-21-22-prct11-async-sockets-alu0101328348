import chalk from 'chalk';

/**
 * Función que muestra por consola el título de la nota
 * con el color correspondiente
 * @param {string} titleNote Título de la nota
 * @param {string} colorNote Color de la nota
 */
export function printPartOfNoteByColor(titleNote: string, colorNote: string): void {
  switch (colorNote) {
    case 'blue':
      console.log(chalk.blue.italic(titleNote));
      break;
    case 'yellow':
      console.log(chalk.yellow.italic(titleNote));
      break;
    case 'red':
      console.log(chalk.red.italic(titleNote));
      break;
    case 'green':
      console.log(chalk.green.italic(titleNote));
      break;
  }
}
