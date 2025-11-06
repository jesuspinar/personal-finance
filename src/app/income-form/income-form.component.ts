import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { OfflineDbService } from '../offline-db.service';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class IncomeFormComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly db = inject(OfflineDbService);
  mode = signal<'add' | 'edit'>('add');

  form = this.fb.group({
    description: ['', [Validators.required]],
    amount: ['', [Validators.required, Validators.min(0)]],
    date: ['', [Validators.required]]
  });

  ngOnInit(): void {
    if (this.router.url.includes('add-income')) {
      this.mode.set('add');
    } else {
      this.mode.set('edit');
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.db.incomes.add(this.form.value as any).then(() => this.router.navigate(['/income']));
    }
  }
}
