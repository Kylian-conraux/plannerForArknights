import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreakpointObserver } from '@angular/cdk/layout';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/layouts/header/header.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatListModule,
    MatSidenavModule, MatToolbarModule, RouterLink, RouterLinkActive,
    RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'plannerForArknights';

  // Référence au composant MatSidenav pour manipuler la barre latérale
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  // Indique si l'application est en mode mobile (true si largeur < 800px)
  isMobile = true;
  // Indique si la barre latérale est en mode "réduite"
  isCollapsed = true;

  constructor(private observer: BreakpointObserver) { }

  // Initialise l'état de l'interface utilisateur en fonction de la taille de l'écran
  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  // Méthode pour basculer l'état du menu latéral
  toggleMenu() {
    if (this.isMobile) {
      // En mode mobile, on ouvre ou ferme simplement le menu
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
       // En mode bureau, on ouvre le menu si réduit ou on le réduit si ouvert
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
