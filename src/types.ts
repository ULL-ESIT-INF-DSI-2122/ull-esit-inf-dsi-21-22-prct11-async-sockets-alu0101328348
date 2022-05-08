
// peticiones al servidor
export type ResponseType = {
  type: 'add' | 'modify' | 'remove' | 'read' | 'list';
  success: boolean;
  message?: string;
  dataJSON?: any;
  arryJSON?: any[];
}

// respuesta
export type RequestType = {
  type: 'add' | 'modify' | 'remove' | 'read' | 'list';
  user: string;
  title?: string;
  body?: string;
  color?: string;
}

// modificación
export type CommandType = {
  type: 'cat' | 'ls';
  fichero: string;
  option?: string;
}
