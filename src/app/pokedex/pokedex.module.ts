import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Pokedex } from './pokedex';

import {  PokedexRoutingModule } from './pokedex-routing.module';
import { PokemonCardComponent } from '@components/pokemon-card/pokemon-card.component';
import { PaginatorComponent } from '@components/paginator/paginator.component';
import { MissingPageComponent } from '@components/missing-page/missing-page.component';
import { ModalComponent } from '@components/modal/modal.component';
 


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokedexRoutingModule,
  ],
  declarations: [
    Pokedex,
    PokemonCardComponent,
    PaginatorComponent,
    MissingPageComponent,
    ModalComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class PokedexModule {}
