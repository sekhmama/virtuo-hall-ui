import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { PlanetsComponent } from './system/planets/planets.component';

export const routes: Routes = [
    { path: '', component: PlanetsComponent },
    {
        path: 'games',
        loadComponent: () =>
            loadRemoteModule('games', './Component').then((m) => m.AppComponent),
    },
    {
        path: 'stream',
        loadComponent: () =>
            loadRemoteModule('stream', './Component').then((m) => m.AppComponent),
    },
    {
        path: '**',
        component: PlanetsComponent,
    },
];