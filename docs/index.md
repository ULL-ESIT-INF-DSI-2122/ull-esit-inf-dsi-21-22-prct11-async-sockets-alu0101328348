# Práctica 11 - Cliente y servidor para una aplicación de procesamiento de notas de texto
### [Git Pages](https://ull-esit-inf-dsi-2122.github.io/ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101328348/).

### DATOS:
nombre:
correo:
<!-- mejor en el readme? -->

## Índice
- [Introducción](#id1)
- [Clases](#id2)
  - [Clase User](id3)
  - [Clase Server](#id4)
  - [Clase Client](#id5)
- [App cliente](#id6)
- [App servidor](#id7)
- [Conclusión](#id8)
- [Referencias](#id9)


## Introducción <a name="id1"></a>
En esta práctica, se implementará un servidor y cliente para escribir un servidor y un cliente haciendo uso de los sockets proporcionados por el módulo net de Node.js. Para ello, se partirá de la práctica 9 de procesamiento de notas.
## Clases <a name="id2"></a>
### Clase User <a name="id3"></a>
Esta clase de la práctica 9, sólo se han modificado el valor de retorno de las todas las funciones que permiten: añadir, modificar, eliminar, listar y leer notas de un usuario concreto. Dicha clase se define en [user.ts](). Este valor de retorno es un alias _ResponseType_, definido en el fichero [types.ts](). La cual, es una respuesta del servidor hacia la petición del cliente.
### Clase Server <a name="id4"></a>
Se define la clase Server en el fichero [serverClass](). Esta clase recibe como parámetro en su constructor el número de puerto, así pues facilita crear el socket y así el manejo de los eventos.
```typescript
constructor(private puerto: number) { super(); }
```

Server tiene un único método el cuál se encarga del funcionamiento del servidor.
```typescript
public run(): void {
  const sockeT = net.createServer((socket) => {
    console.log(chalk.green('Se ha conectado un cliente'));
    socket.on('event', () => {});
    console.log(chalk.green('Numero de clientes conectados: ' + listenerCount(socket, 'event')));

    // se lee los datos que el cliente envía
    let datachunk = '';
    socket.on('data', (data) => {
      datachunk = data.toString();
    });

    socket.on('end', () => {
      console.log(chalk.green('Fin de datos de envío'));
      const json = JSON.parse(datachunk);
      const note: Note = new Note(json.title, json.color, json.body);
      const user: User = new User(json.user);
      switch (json.type) {
        case 'add':
          // deserializamos el json ResponseType que retorn ala función add
          const respuestaServerToClient: ResponseType = user.addNote(note);
          socket.emit('message', respuestaServerToClient); // emitimos un mensaje al socket del server
          // cerramos el socket
          socket.end();
          break;
        case 'modify':
          const respuestaModify: ResponseType = user.modifyNote(note);
          socket.emit('message', respuestaModify);
          socket.end();
          break;
        case 'remove':
          const respuestaDelete: ResponseType = user.deleteNote(note.getName());
          socket.emit('message', respuestaDelete);
          socket.end();
          break;
        case 'read':
          const respuestaRead: ResponseType = user.readNote(note.getName());
          socket.emit('message', respuestaRead);
          socket.end();
          break;
        case 'list':
          const respuestaList: ResponseType = user.listNotes();
          socket.emit('message', respuestaList);
          socket.end();
          break;
        default:
          break;
      }
    });

    // envía el mensaje
    socket.on('message', (message) => {
      socket.write(JSON.stringify(message) + '\n');
    });

    socket.on('error', (err) => {
      console.log(chalk.red(err.message));
    });

    socket.on('close', () => {
      console.log(chalk.green('El cliente se ha desconectado'));
    });
  });
  sockeT.listen(this.puerto, () => {
    console.log(chalk.green('Esperando a que un cliente se conecte...'));
  });
}
```
En primer lugar creamos el servidor con _createServer_ del módulo de net. Luego, con la función _listenerCount_ del módulo _events_, contamos cuantos usuarios están concetados al servidor.

Cuando el socket cliente emite un evento _data_, significa que el otro extremo del socket, el servidor, ha enviado datos que están disponibles para ser leídos.
```typescript
let datachunk = '';
socket.on('data', (data) => {
    datachunk = data.toString();
});
```
Podemos observar que el _datachunk_ vamos guardanto los datos del buffer _data_, para que luego puedan ser serializados (parseados) cuando el socket emita un evento end.

Cuando el método emita un evento _end_ debido a la invocación del método _end()_ del socket, procesaremos las peticiones del cliente. Para ello, en el switch, se guardará en una variable la respuesta que devuelve la correspondiente función. Y después el socket emitirá un evento _message_ para que esa respuesta en formato JSON se serialice y escriba al socket. Finalmente, el socket se cerrará invocando a la función end.


### Clase Client <a name="id5"></a>
Se define la clase Client en el fichero [clientClass](). Esta clase recibe como parámetro en su constructor el número de puerto.
```typescript
constructor(private puerto: number) { super(); }
```

Al igual que la anterior clase, serverClass, existe una función para la ejecución del cliente.
```typescript
public run(request: RequestType) {
  const sockeCliente = net.connect(this.port);

  let dataChunk = '';
  sockeCliente.on('data', (data) => {
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
```
Primero, creamos el socket cliente con _connect_ del módulo net.

Cuando el socket ejecute un evento del tipo end se parceará el dato entero leído cuando se produzca una evento de tipo _data_, y se emitirá un evento _request_ con el dato json. Cuando se emita el evento anteriormente mencionado, se procesará la respuesta del servidor.

## App cliente <a name="id6"></a>
El programa principal del cliente, definido en el fichero [appClient.ts](), se enviará las peticiones del cliente al servidor. El siguiente ejemplo muestra la configuración de un comando:
```typescript
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
```

## App servidor <a name="id7"></a>
En [appServer.ts]() se ejecuta el método run() de la clase Server para la ejecución del servidor.
```typescript
const servidor = new Server(60300);
servidor.run();

```

## Conclusión <a name="id8"></a>


## Referencias <a name="id9"></a>
- [Class: net.Server de Node.js](https://nodejs.org/dist/latest-v18.x/docs/api/net.html#class-netserver)
- [Class: EventEmitter de Node.js](https://nodejs.org/dist/latest-v18.x/docs/api/events.html#class-eventemitter)
- [Artículo en español de net.server](https://programmerclick.com/article/1388424100/)
- [Enunciado](https://ull-esit-inf-dsi-2122.github.io/prct11-async-sockets/)