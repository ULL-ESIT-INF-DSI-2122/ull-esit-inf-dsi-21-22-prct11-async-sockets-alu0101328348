// import 'mocha';
// import {expect} from 'chai';
// import {Server} from '../src/serverPrueba';

// describe('Asincrono test de la clase Server', () => {
//   it('La funcion run debe que ejecutarse bien', (done) => {
//     const servidor = new Server(60300);
//     // servidor.run();
//     servidor.on('message', (message) => {
//       console.log(message);
//       expect(message).to.be.eql({'type': 'change', 'prev': 13, 'curr': 26});
//       done();
//     });
//     servidor.emit('data', '{"type": "change", "prev": 13');
//     servidor.emit('data', ', "curr": 26}');
//     servidor.emit('data', '\n');
//   });
// });
