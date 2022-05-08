// import 'mocha';
// import {expect} from 'chai';
// import {Client} from '../src/clientClass';
// // import {ResponseType} from '../src/types';
// // import {Server} from '../src/serverPrueba';

// describe('Test del cliente', () => {
//   const cliente: Client = new Client(60300);
//   // const servidor = new Server(60300);
//   it('Clase cleinte realiza la peticion add', (done) => {
//   //   // const peticion: RequestType = {type: 'add', user: 'edusegre',
//   //   //   title: 'Red note', body: 'This is a red note', color: 'red'};

//     //   // cliente.run(peticion);
//     //   // cliente.on('request', (request) => {

//     //   // });
//     //   cliente.on('response', (response) => {
//     //     expect(response).to.be.eql('New note added!');
//     //   });

//     //   const ResponseJson :ResponseType = {
//     //     type: 'add',
//     //     success: true,
//     //   };

//     //   cliente.emit('data', JSON.stringify(ResponseJson));
//     //   done();
//     // });

//     // it('Existe el método run()', (done) => {
//     //   expect(cliente.run).to.exist;
//     //   expect(cliente.run).to.be.a('function');
//     //   done();
//     cliente.on('message', (message) => {
//       expect(message).to.be.eql({'type': 'change', 'prev': 13, 'curr': 26});
//       done();
//     });

//     cliente.emit('data', '{"type": "change", "prev": 13');
//     cliente.emit('data', ', "curr": 26}');
//     cliente.emit('data', '\n');
//   });
// });

