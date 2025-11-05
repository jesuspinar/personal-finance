import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css']
})
export class IncomeFormComponent  implements OnInit {

  private readonly router = inject(Router);
  mode = signal<'add' | 'edit'>('add');

  income = {
    description: '',
    amount: 0,
    date: ''
  };

  ngOnInit(): void {
    if (this.router.url.includes('add-income')) {
      this.mode.set('add');
    } else {
      this.mode.set('edit');
    }
  }


  onSubmit(): void {

    console.log('Form submitted:', this.income);
  }
}
