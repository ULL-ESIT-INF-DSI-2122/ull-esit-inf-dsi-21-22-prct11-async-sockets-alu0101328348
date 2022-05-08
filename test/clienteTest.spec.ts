// import 'mocha';
// import {expect} from 'chai';
// import {Client} from '../src/clientClass';

// describe('Test del cliente', () => {
//   const cliente: Client = new Client(60300);
//   it('Clase cliente realiza la petición remove', (done) => {
//     cliente.on('request', (request) => {
//       expect(request).to.be.eql({"type": "remove", "success": false, "message": "Error: el fichero no existe"});
//       done();
//     });

//     cliente.emit('data', '{"type":"remove","success":false,');
//     cliente.emit('data', '"message":"Error: el fichero no existe"}');
//     cliente.emit('data', '\n');
//   });
// });
