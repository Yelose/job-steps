import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [MatSidenavModule, MatListModule, MatButtonModule, MatCardModule, MatIconModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  public utilities = [{
    title: "Seguimiento de candidaturas",
    sub1: "Guarda ofertas con enlaces (LinkedIn, portales, etc.)",
    sub2: "Añade la fecha y el estado actual",
    icon: "work_history"
  },
  {
    title: "Etapas personalizadas",
    sub1: "Añade entrevistas, pruebas técnicas, llamadas...",
    sub2: "Configura las fases según cada empresa",
    icon: "cases"

  },
  {
    title: "Análisis visual",
    sub1: "Gráficas automáticas con tu progreso",
    sub2: "Distingue empresas que responden, te ignoran o te rechazan",
    icon: "bar_chart"
  },
  {
    title: "Mejora continua",
    sub1: "Detecta patrones de rechazo",
    sub2: "Evalúa cada oferta y ajusta tu CV o estrategia",
    icon: "recommend"
  }]
}
