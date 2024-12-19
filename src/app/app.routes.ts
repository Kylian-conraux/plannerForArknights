import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'list',
        loadComponent: () => import('./features/operator-list/operator-list-page.component').then(m => m.OperatorListComponentPage)
    },
    {
        path: '**',
        redirectTo: 'home' //redirection in case of wrong route
    }
];
