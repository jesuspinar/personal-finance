import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { OutcomeService } from '../shared/services/outcome.service';

@Component({
  selector: 'app-outcome-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './outcome-form.component.html',
  styleUrls: ['./outcome-form.component.css']
})
export class OutcomeFormComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly outcomeService = inject(OutcomeService);

  mode = signal<'add' | 'edit'>('add');
  currentId: number | null = null;

  form = this.fb.group({
    details: ['', [Validators.required]],
    amount: ['', [Validators.required, Validators.min(0)]],
    date: [new Date().toISOString().substring(0, 10), [Validators.required]]
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(async params => {
      const idParam = params['id'];
      if (idParam) {
        this.mode.set('edit');
        this.currentId = +idParam;

        // Load the outcome record via the service
        const outcome = await this.outcomeService.getById(this.currentId);
        if (outcome) {
          this.form.patchValue({
            details: outcome.details,
            amount: outcome.amount.toString(),
            date: outcome.date
          });
        }
      } else {
        this.mode.set('add');
      }
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.form.valid) return;

    const outcomeData = this.form.value as any;

    if (this.mode() === 'edit' && this.currentId != null) {
      await this.outcomeService.update({ id: this.currentId, ...outcomeData });
    } else {
      await this.outcomeService.add(outcomeData);
    }

    this.router.navigate(['/outcome']);
  }
}
