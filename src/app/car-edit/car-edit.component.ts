import { Component, OnInit, inject, signal, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../model/car.type';
import { CarsService } from '../services/cars.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent {
  car = signal<Car | null>(null);
  carsService = inject(CarsService);

  constructor(private route: ActivatedRoute, private router: Router) {
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

  saveCar(): void {
    const carToSave = this.car();
    if (carToSave) {
      this.carsService.saveCarToLocalStorage(carToSave);
      this.router.navigate(['/detail/car/', carToSave.id]); 
    }
  }

  cancel(): void {
    this.router.navigate(['/cars']); 
  } 
  
  addPart(): void {
    const currentCar = this.car();
    if (currentCar) {
      currentCar.parts.push({
        name: '',
        cost: 0,
        details: {
          type: '',
          warranty_years: 0
        }
      });
      this.car.set({ ...currentCar });
    }
  }

  deletePart(index: number): void {
    const currentCar = this.car();
    if (currentCar) {
      currentCar.parts.splice(index, 1); 
      this.car.set({ ...currentCar }); 
    }
  }
}
