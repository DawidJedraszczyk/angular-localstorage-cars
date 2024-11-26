import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarEditComponent } from './car-edit/car-edit.component';
import { CarCreateComponent } from './car-create/car-create.component';

export const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: 'cars',
    },
    {
        path: 'cars', component: HomeComponent
    },
    {
        path: 'create/car', component: CarCreateComponent
    },
    {
        path: 'edit/car/:id', component: CarEditComponent
    },
    {
        path: 'detail/car/:id', component: CarDetailComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})


export class AppRoutingModule { }