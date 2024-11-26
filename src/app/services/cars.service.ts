import { Injectable, inject } from '@angular/core';
import { Car } from '../model/car.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  http = inject(HttpClient)


  getCarsFromAssets = (): Observable<{ cars: Array<Car> }> => {
    const path = 'assets/cars.json';
    return this.http.get<{ cars: Array<Car> }>(path);
  };

  saveCarToLocalStorage(car: Car): void {
    localStorage.setItem(`car-${car.id}`, JSON.stringify(car));
  }

  getCarFromLocalStorage(id: number): Car | null {
    const car = localStorage.getItem(`car-${id}`);
    return car ? JSON.parse(car) : null;
  }

  getCar(id: number): Observable<Car | null> {
    const localCar = this.getCarFromLocalStorage(id);
  
    if (localCar) {
      return new Observable<Car | null>((observer) => {
        observer.next(localCar);
        observer.complete();
      });
    } else {
      return new Observable<Car | null>((observer) => {
        this.fetchAndStoreCars().subscribe({
          next: () => {
            const updatedCar = this.getCarFromLocalStorage(id);
            observer.next(updatedCar || null);
            observer.complete();
          },
          error: (err) => {
            observer.error(err);
          }
        });
      });
    }
  }
  
  removeCarFromLocalStorage(id: number): void {
    localStorage.removeItem(`car-${id}`);
  }

  fetchAndStoreCars(): Observable<void> {
    return new Observable((observer) => {
      this.getCarsFromAssets().subscribe({
        next: (response) => {
          response.cars.forEach((car) => this.saveCarToLocalStorage(car));
          observer.next();
          observer.complete();
        },
        error: (err) => {
          console.error('Error fetching cars:', err);
          observer.error(err);
        }
      });
    });
  }

  getAllCarsFromLocalStorage(): Array<Car> {
    const cars: Array<Car> = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('car-')) {
        const car = localStorage.getItem(key);
        if (car) {
          cars.push(JSON.parse(car));
        }
      }
    }
    return cars;
  }

  getAllCars(): Observable<Array<Car>> {
    const localCars = this.getAllCarsFromLocalStorage();
  
    if (localCars.length > 0) {
      return new Observable((observer) => {
        observer.next(localCars);
        observer.complete();
      });
    } else {
      return new Observable((observer) => {
        this.fetchAndStoreCars().subscribe({
          next: () => {
            const updatedCars = this.getAllCarsFromLocalStorage();
            observer.next(updatedCars);
            observer.complete();
          },
          error: (err) => {
            observer.error(err);
          }
        });
      });
    }
  }
  
  


  constructor() { }
}
