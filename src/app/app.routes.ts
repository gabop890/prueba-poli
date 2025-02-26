import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PaisesComponent } from './components/paises/paises.component';
import { DetallePaisComponent } from './components/detalle-pais/detalle-pais.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Prueba tecnica Poli',
    children: [
      { path: 'inicio', component: InicioComponent },
      {
        path: 'paises',
        component: PaisesComponent,
        children: [{ path: 'pais/:id', component: DetallePaisComponent }],
      },
    ],
  },
];
