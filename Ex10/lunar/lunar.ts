import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LunarYear, LunarDetail } from '../shared/lunar-year.model';

@Component({
  selector: 'app-lunar',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './lunar.html',
  styleUrls: ['./lunar.css']
})
export class Lunar implements OnInit {

  days: number[] = [];
  months: number[] = [];
  years: number[] = [];

  selectedDay = 15;
  selectedMonth = 5;
  selectedYear = 1986;

  detail!: LunarDetail;   

  ngOnInit(): void {
    this.days = Array.from({ length: 31 }, (_, i) => i + 1);
    this.months = Array.from({ length: 12 }, (_, i) => i + 1);

    const start = 1900;
    const end = 2050;
    this.years = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  convert(): void {
    const lunar = new LunarYear(this.selectedDay, this.selectedMonth, this.selectedYear);
    this.detail = lunar.findLunarYearDetail();
  }
}
