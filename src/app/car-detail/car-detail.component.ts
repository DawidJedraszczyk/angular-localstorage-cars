import { Component, OnInit, inject, signal, effect } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Car } from '../model/car.type';
import { CarsService } from '../services/cars.service';
import { CommonModule } from '@angular/common';

declare const bootstrap: any;

@Component({
  selector: 'app-car-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})

export class CarDetailComponent {
  car = signal<Car | null>(null);

  
  constructor(private route: ActivatedRoute, private router: Router, private carsService: CarsService) {
    effect(() => {
      const carId = this.route.snapshot.paramMap.get('id');
      if (carId) {
        this.carsService.getCar(parseInt(carId, 10)).subscribe({
          next: (car) => this.car.set(car),
          error: (err) => console.error('Error fetching car:', err)
        });
      }
    });
  }


  editCar(carId: number): void {
    this.router.navigate([`/edit/car/${carId}`]);
  }

  openDeleteModal(carId: number): void {
    const modal = document.getElementById('deleteModal');
    if (modal) {
      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  }

  confirmDelete(carId: number): void {
    this.carsService.removeCarFromLocalStorage(carId);
    this.car.set(null); 
    this.router.navigate(['/cars'])
  }
}
