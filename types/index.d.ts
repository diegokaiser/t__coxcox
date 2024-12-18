
declare interface Usuario {
  apellidos: string;
  email: string;
  mkt: boolean;
  nombre: string;
  telefono: string;
  titulo: string;
}

declare interface Reserva {
  key?: string;
  anyo: string;
  createdAt: Date;
  dia: string;
  fecha: string;
  hora: string;
  mes: string;
  people: string;
  usuario: Usuario;
}
