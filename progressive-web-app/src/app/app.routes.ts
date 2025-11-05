import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncomeComponent } from './income/income.component';
import { OutcomeComponent } from './outcome/outcome.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'income', component: IncomeComponent },
  { path: 'outcome', component: OutcomeComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
