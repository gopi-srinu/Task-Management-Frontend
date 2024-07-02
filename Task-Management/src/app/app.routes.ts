import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'splash',
        pathMatch: 'full'
    },
    {
        path: 'splash',
        loadComponent: () => import('../app/pages/splash/splash.component').then((x) => x.SplashComponent),
    },
    {
        path: 'home',
        loadComponent: () => import('../app/pages/home/home.component').then((m) => m.HomeComponent),
    },
    {
        path: 'addTask/:name', 
        loadComponent: () => import('../app/pages/add-task/add-task.component').then((a) => a.AddTaskComponent)
    },
];
