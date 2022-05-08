import 'mocha';
import {expect} from 'chai';
import {Note} from '../src/note';
import {User} from '../src/user';
import {ResponseType} from '../src/types';

describe('Test de la clase user', () => {
  const nota = new Note("Blue Note", "blue", "Esto es una nota azul");
  const nota2 = new Note("Blue Note", "green", "Esto es una nota verde!");
  const nota3 = new Note("Green Note", "green", "Esto es una nota verde!");
  const user = new User("Dana");
  const user2 = new User("dsi");

  it('Existe el método getUser()', () => {
    expect(user.getUser()).to.exist;
    expect(user.getUser).to.be.a('function');
    expect(user.getUser()).to.be.equal('Dana');
  });

  it('Existe el método addNote()', () => {
    const peticion: ResponseType = {type: 'add', success: true, message: 'El fichero se ha creado'};
    const err: ResponseType = {type: 'add', success: false, message: 'Error: el fichero ya existe'};
    expect(user.addNote).to.exist;
    expect(user.addNote).to.be.a('function');
    expect(user.addNote(nota)).to.deep.equal(peticion);
    expect(user.addNote(nota)).to.deep.equal(err);
  });

  it('Existe el método readNote()', () => {
    expect(user.readNote).to.exist;
    expect(user.readNote).to.be.a('function');
    const data = {title: 'Blue Note', body: 'Esto es una nota azul', color: 'blue'};
    const peticion: ResponseType = {type: 'read', success: true, message: 'Nota leida!', dataJSON: data};
    expect(user.readNote(nota.getName())).to.deep.equal(peticion);
    const err: ResponseType = {type: 'read', success: false, message: 'Error: el fichero no existe'};
    expect(user.readNote("prueba.json")).to.deep.equal(err);
    const err2: ResponseType = {type: 'read', success: false, message: 'Error: El directorio no existe'};
    expect(user2.readNote(nota.getName())).to.deep.equal(err2);
  });

  it('Existe el método listNotes()', () => {
    expect(user.listNotes).to.exist;
    expect(user.listNotes).to.be.a('function');
    const jsonData = [{title: nota.getName(), body: nota.getBody(), color: nota.getColor()}];
    const peticion: ResponseType = {type: 'list', success: true, message: 'Tus notas:', arryJSON: jsonData};
    expect(user.listNotes()).to.deep.equal(peticion);
    const err: ResponseType = {type: 'list', success: false, message: 'No existe del directorio'};
    expect(user2.listNotes()).to.deep.equal(err);
  });

  it('Existe el método modifyNote()', () => {
    expect(user.modifyNote).to.exist;
    expect(user.modifyNote).to.be.a('function');
    const peticion: ResponseType = {type: 'modify', success: true, message: 'El fichero se ha modificado'};
    expect(user.modifyNote(nota2)).to.deep.equal(peticion);
    const err: ResponseType = {type: 'modify', success: false, message: 'Error: el fichero no existe'};
    expect(user.modifyNote(nota3)).to.deep.equal(err);
    const err2: ResponseType = {type: 'modify', success: false, message: 'Error: el directorio no existe'};
    expect(user2.modifyNote(nota)).to.deep.equal(err2);
  });

  it('Existe el método deleteNote()', () => {
    expect(user.deleteNote).to.exist;
    expect(user.deleteNote).to.be.a('function');
    const peticion: ResponseType = {type: 'remove', success: true, message: 'Nota eliminada!'};
    expect(user.deleteNote(nota.getName())).to.deep.equal(peticion);
    const err: ResponseType = {type: 'remove', success: false, message: 'Error: el fichero no existe'};
    expect(user.deleteNote("prueba.json")).to.deep.equal(err);
    const err2: ResponseType = {type: 'remove', success: false, message: 'Error: el directorio no existe'};
    expect(user2.deleteNote(nota.getName())).to.deep.equal(err2);
  });

  it('Existe el método checkColor()', () => {
    expect(user.checkColor).to.exist;
    expect(user.checkColor).to.be.a('function');
    expect(user.checkColor('blue')).to.be.equal(true);
    expect(user.checkColor('pink')).to.be.equal(false);
  });
});
