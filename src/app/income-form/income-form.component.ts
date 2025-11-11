import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { OfflineDbService } from '../shared/services/offline-db.service';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class IncomeFormComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly db = inject(OfflineDbService);
  mode = signal<'add' | 'edit'>('add');
  currentId: number | null = null;

  form = this.fb.group({
    description: ['', [Validators.required]],
    amount: ['', [Validators.required, Validators.min(0)]],
    date: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const idParam = params['id'];
      if (idParam) {
        this.mode.set('edit');
        this.currentId = +idParam;
        this.db.incomes.get(this.currentId).then(income => {
          if (income) {
            this.form.patchValue({
              description: income.description,
              amount: income.amount.toString(),
              date: income.date
            });
          }
        });
      } else {
        this.mode.set('add');
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.mode() === 'edit' && this.currentId != null) {
        this.db.incomes.update(this.currentId, this.form.value as any)
          .then(() => this.router.navigate(['/income']));
      } else {
        this.db.incomes.add(this.form.value as any)
          .then(() => this.router.navigate(['/income']));
      }
    }
  }
}
