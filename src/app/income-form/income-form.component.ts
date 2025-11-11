import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IncomeService } from '../shared/services/income.service';

@Component({
  selector: 'app-income-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css']
})
export class IncomeFormComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly incomeService = inject(IncomeService);

  mode = signal<'add' | 'edit'>('add');
  currentId: number | null = null;

  form = this.fb.group({
    description: ['', [Validators.required]],
    amount: ['', [Validators.required, Validators.min(0)]],
    date: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(async params => {
      const idParam = params['id'];
      if (idParam) {
        this.mode.set('edit');
        this.currentId = +idParam;

        // Load the income record via the service
        const income = await this.incomeService.getById(this.currentId);
        if (income) {
          this.form.patchValue({
            description: income.description,
            amount: income.amount.toString(),
            date: income.date
          });
        }
      } else {
        this.mode.set('add');
      }
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.form.valid) return;

    const incomeData = this.form.value as any;

    if (this.mode() === 'edit' && this.currentId != null) {
      await this.incomeService.update({ id: this.currentId, ...incomeData });
    } else {
      await this.incomeService.add(incomeData);
    }

    this.router.navigate(['/income']);
  }
}
