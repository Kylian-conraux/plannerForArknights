import { Routes } from '@angular/router';
import { preloadGuard } from './core/guards/preload.guard';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'list',
        loadComponent: () => import('./features/operator-list/operator-list-page.component').then(m => m.OperatorListComponentPage),
        canActivate: [preloadGuard]
    },
    {
        path: 'filter',
        loadComponent: () => import('./core/components/filter-container/filter-container.component').then(m => m.FilterContainerComponent)
    },
    {
        path: 'operator/:id',
        loadComponent: () => import('./features/operator-details/operator-details.component').then(m => m.OperatorDetailsComponent)
    },
    {
        path: 'planner',
        loadComponent: () => import('./features/planner/planner.component').then(m => m.PlannerComponent),
        canActivate: [preloadGuard]
    },
    {
        path: '**',
        redirectTo: 'home' //redirection in case of wrong route
    }
];
