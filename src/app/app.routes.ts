import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncomeComponent } from './income/income.component';
import { OutcomeComponent } from './outcome/outcome.component';
import { IncomeFormComponent } from './income-form/income-form.component';
import { OutcomeFormComponent } from './outcome-form/outcome-form.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'income',
    children: [
      { path: '', component: IncomeComponent },
      { path: 'add-income', component: IncomeFormComponent },
      { path: 'edit-income', component: IncomeFormComponent },
    ]
  },
  {
    path: 'outcome',
    children: [
      { path: '', component: OutcomeComponent },
      { path: 'add-outcome', component: OutcomeFormComponent },
      { path: 'edit-outcome', component: OutcomeFormComponent },
    ]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
