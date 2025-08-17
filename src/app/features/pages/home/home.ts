import { Component, computed, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
@Component({
  selector: 'app-home',
  imports: [MatSidenavModule, MatListModule, MatButtonModule, MatCardModule, MatIconModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  authService = inject(AuthService)
  readonly loggedIn = computed(() => !!this.authService.currentUser());

  // home.ts
  public utilities = [
    {
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
      title: "Personaliza tu formulario",
      sub1: "Elige qué campos ver u obligar al crear una oferta",
      sub2: "Guarda tu configuración y úsala siempre",
      icon: "tune"
    }] as const

  public utilities2 = [

    {
      title: "Gestión rápida",
      sub1: "Añade, edita o elimina ofertas en segundos",
      sub2: "Mantén tus datos siempre actualizados",
      icon: "playlist_add_check"
    },
    {
      title: "Estadísticas",
      sub1: "Gráficas automáticas con tu progreso",
      sub2: "Compara estados y evolución de tus ofertas",
      icon: "bar_chart"
    },
    {
      title: "Perfil y progreso",
      sub1: "Consulta ofertas enviadas y pendientes",
      sub2: "Revisa tu información de usuario",
      icon: "account_circle"
    }
  ] as const;

}
