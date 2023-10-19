import { PokemonDto } from '../dto/pokemon.dto';
import { PokeapiService } from '../services/pokeapi.service';
import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { FetchPokemonComponent } from './_utils/fetch-pokemon/fetch-pokemon.component';

register();
@Component({
  selector: 'pokedex',
  templateUrl: './pokedex.html',
  styleUrls: ['./pokedex.scss'],
})
export class Pokedex extends FetchPokemonComponent implements OnInit{

  currentPage: number = 1;

  isModalOpen: boolean = false;

  constructor(override pokeapiService: PokeapiService) {
    super(pokeapiService);
  }

  ngOnInit(): void {
    this.fetchPokemons();
  }
  
  changePage(page: number) {
    this.currentPage = page;
    page = page - 1;
    this.fetchPokemons(page * 6)
  }

  openModal(pokemon: PokemonDto) {
    this.pokemon = pokemon;
    console.log(pokemon);
    this.isModalOpen = true;
  }
}
