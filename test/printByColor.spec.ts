import 'mocha';
import {expect} from 'chai';
import {printPartOfNoteByColor} from '../src/printBycolor';
import {Note} from '../src/note';

describe('Función printPartOfNoteByColor', () => {
  const nota = new Note("Blue Note", "blue", "Esto es una nota azul");
  it('La función funciona correctamente', () => {
    expect(printPartOfNoteByColor).to.exist;
    expect(printPartOfNoteByColor).to.be.a('function');
    expect(printPartOfNoteByColor(nota.getName(), 'blue')).to.be.equal(undefined);
    expect(printPartOfNoteByColor(nota.getName(), 'yellow')).to.be.equal(undefined);
    expect(printPartOfNoteByColor(nota.getName(), 'red')).to.be.equal(undefined);
    expect(printPartOfNoteByColor(nota.getName(), 'green')).to.be.equal(undefined);
  });
});
