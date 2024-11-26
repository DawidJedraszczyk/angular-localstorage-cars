import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car } from '../../model/car.type'
import { CarsService } from '../../services/cars.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

declare const bootstrap: any;

@Component({
  selector: 'app-car-detail-small',
  imports: [CommonModule, RouterModule],
  templateUrl: './car-detail-small.component.html',
  styleUrl: './car-detail-small.component.css'
})
export class CarDetailSmallComponent {
  @Input() car!: Car;
  @Output() carDeleted = new EventEmitter<number>(); 

  constructor(private route: ActivatedRoute, private router: Router, private carsService: CarsService){}
  
  
  openDeleteModal(carId: number): void {
    const modal = document.getElementById('deleteModal');
    if (modal) {
      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  }

  confirmDelete(carId: number): void {
    this.carsService.removeCarFromLocalStorage(carId);
    this.carDeleted.emit(carId); 
  }
}
