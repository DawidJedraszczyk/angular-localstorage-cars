import { Component } from '@angular/core';
import { CarsListComponent } from '../components/cars-list/cars-list.component'

@Component({
  selector: 'app-home',
  imports: [CarsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
