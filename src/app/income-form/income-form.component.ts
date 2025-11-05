import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

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

    console.log('Form submitted:', this.form.value);

  }
}
