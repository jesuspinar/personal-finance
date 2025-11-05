import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'income', component: IncomeComponent },
  { path: 'outcome', component: OutcomeComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];