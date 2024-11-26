import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../model/car.type';
import { CarsService } from '../services/cars.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.css']
})
export class CarCreateComponent {
  car: Car = {
    id: Date.now(), 
    model: '',
    manufacturer: '',
    year: new Date().getFullYear(),
    image_path: '', 
    parts: []
  };

  imagePreview: string | null = null; 

  constructor(private carsService: CarsService, private router: Router) {}

  saveCar(): void {
    this.carsService.saveCarToLocalStorage(this.car);
    console.log('New car created:', this.car);
    this.router.navigate(['/cars']); 
  }

  cancel(): void {
    this.router.navigate(['/cars']); 
  }

  addPart(): void {
    this.car.parts.push({
      name: '',
      cost: 0,
      details: {
        type: '',
        warranty_years: 0
      }
    });
  }

  deletePart(index: number): void {
    this.car.parts.splice(index, 1);
  }

  handleImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result as string; 
        this.car.image_path = reader.result as string; 
      };

      reader.readAsDataURL(file); 
    }
  }
}
