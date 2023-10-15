import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Pokedex } from './pokedex';

import { HomePageRoutingModule } from './pokedex-routing.module';
import { PokemonCardComponent } from '@components/pokemon-card/pokemon-card.component';
import { PaginatorComponent } from '@components/paginator/paginator.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [
    Pokedex,
    PokemonCardComponent,
    PaginatorComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class HomePageModule {}
