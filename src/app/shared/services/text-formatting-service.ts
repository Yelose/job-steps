import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TextFormattingService {
  /**
   * Convierte un string de textarea en un array de líneas separadas.
   */
  toLineArray(text: string): string[] {
    return text
      .split('\n')
      .map(line => line.trimEnd()) // puedes usar trim() si quieres eliminar también espacios al inicio
      .filter(line => line.length > 0);
  }

  /**
   * Convierte saltos de línea en <br> si prefieres mostrar en <p> único.
   */
  toHtmlWithLineBreaks(text: string): string {
    return text.replace(/\n/g, '<br>');
  }
}
