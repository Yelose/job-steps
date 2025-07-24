import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateConvertionService {
  toValidDate(input: any): Date {
    if (!input) return new Date('Invalid Date');

    // Firestore Timestamp con método toDate(), es decir que si viene de Firestor y tiene
    //.toDate(), lo convierte en una fecha válida.
    if (typeof input === 'object' && typeof input.toDate === 'function') {
      return input.toDate();
    }

    // Si ya es un Date válido, no hace nada
    if (input instanceof Date && !isNaN(input.getTime())) {
      return input;
    }

    // Si es un número tipo timestamp, convierte un número en un fecha
    if (typeof input === 'number') {
      return new Date(input);
    }

    // Si es un string, lo convierte en una fecha
    if (typeof input === 'string') {
      const date = new Date(input);
      return !isNaN(date.getTime()) ? date : new Date('Invalid Date');
    }

    // Si es un objeto tipo { seconds, nanoseconds }
    //Esto es típico de Firestore, y convierte el campo seconds a milisegundos
    if ('seconds' in input && typeof input.seconds === 'number') {
      return new Date(input.seconds * 1000);
    }

    return new Date('Invalid Date');
  }
  toShortDate(input: any): string {
    const date = this.toValidDate(input);
    if (isNaN(date.getTime())) return "Fecha inválida"
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses comienzan en 0
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
}
