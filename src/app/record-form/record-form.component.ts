import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RecordService } from '../shared/services/record.service';
import { Record } from '../shared/models/record.model';


@Component({
  selector: 'app-record-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css']
})
export class RecordFormComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly recordService = inject(RecordService);

  mode = signal<'add' | 'edit'>('add');
  currentId = signal(0);

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
        this.currentId.set(+idParam);

        const record = await this.recordService.getById(this.currentId());
        if (record) {
          this.form.patchValue({
            details: record.details,
            amount: record.amount.toString(),
            date: record.date
          });
        }
      } else {
        this.mode.set('add');
      }
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.form.valid) return;

    const recordData = this.form.value as any;
    const type = this.router.url.includes('expense') ? 'expense' : 'income'

    if (this.mode() === 'edit' && this.currentId() != null) {
      await this.recordService.update({ id: this.currentId(), ...recordData, type });
    } else {
      await this.recordService.add({ ...recordData, type });
    }

    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
