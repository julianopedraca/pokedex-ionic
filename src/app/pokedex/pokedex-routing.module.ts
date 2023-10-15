import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pokedex } from './pokedex';

const routes: Routes = [
  {
    path: '',
    component: Pokedex,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
