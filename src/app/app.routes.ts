import { Routes } from '@angular/router';
import { ChronoComponent } from './pages/chrono/chrono.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {path:"", component: HomeComponent},
    {path:"chrono", component: ChronoComponent}
];
