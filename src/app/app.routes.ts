import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecordsComponent } from './records/records.component';
import { RecordFormComponent } from './record-form/record-form.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'income',
    children: [
      { path: '', component: RecordsComponent },
      { path: 'add-income', component: RecordFormComponent },
      { path: 'edit-income', component: RecordFormComponent },
    ]
  },
  {
    path: 'expense',
    children: [
      { path: '', component: RecordsComponent },
      { path: 'add-expense', component: RecordFormComponent },
      { path: 'edit-expense', component: RecordFormComponent },
    ]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
