import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarDetailSmallComponent } from "../car-detail-small/car-detail-small.component";
import { CarsService } from '../../services/cars.service';
import { Car } from '../../model/car.type';

@Component({
  selector: 'app-cars-list',
  imports: [CommonModule, CarDetailSmallComponent],
  templateUrl: './cars-list.component.html',
  styleUrl: './cars-list.component.css'
})
export class CarsListComponent {
  cars = signal<Array<Car>>([]);

  
  constructor(private carsService: CarsService, private router: Router) {}

  ngOnInit(): void {
    this.carsService.getAllCars().subscribe({
      next: (cars) => {
        this.cars.set(cars);
      },
      error: (err) => {
        console.error('Error fetching cars:', err);
      }
    });
  }

  trackByCarId(index: number, car: Car): number {
    return car.id;
  }  
  
  handleCarDeleted(carId: number): void {
    this.cars.update(cars => cars.filter(car => car.id !== carId));
  }

}
