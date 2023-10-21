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

  tempPokemonFavorite: PokemonDto[] = [];

  isFavorite: boolean = false;

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
    this.isModalOpen = true;
  }

  favoritesControl(pokemon: PokemonDto){
    const pokeIndex = this.pokemonFavorites.findIndex((el) => el === pokemon)
    if (pokeIndex < 0){
      pokemon.isFavorite = true
      this.pokemonFavorites.push(pokemon)      
      console.log(pokemon);
      
      return
    }

    pokemon.isFavorite = false
    this.pokemonFavorites.splice(pokeIndex,1)
    console.log(pokemon);

  }

  showFavorites(){
    if (!this.isFavorite) {
      this.tempPokemonFavorite = this.pokemonsShow
      this.pokemonsShow = this.pokemonFavorites
      this.isFavorite = true
      return
    }
    if (this.isFavorite){
      this.pokemonsShow = this.tempPokemonFavorite
      this.isFavorite = false
    }
  }
    
}
