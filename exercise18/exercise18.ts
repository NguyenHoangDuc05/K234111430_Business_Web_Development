import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-exercise18',
  standalone: false,
  templateUrl: './exercise18.html',
  styleUrls: ['./exercise18.css']
})
export class Exercise18 implements OnInit {

  customersData: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('assets/data/customers.json').subscribe({
      next: (data) => {
        this.customersData = data;
      },
      error: (err) => {
        console.error('Error loading customer data:', err);
      }
    });
  }
}
