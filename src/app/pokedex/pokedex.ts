import { map, mergeMap, of, reduce, toArray } from 'rxjs';
import { PokemonDto } from '../dto/pokemon.dto';
import { PokemonListarDto } from '../dto/pokemon-listar.dto';
import { PokeapiService } from '../services/pokeapi.service';
import {  Component, OnInit } from '@angular/core';
import { PokemonListarResumoDto } from '../dto/pokemon-listar-resumo.dto';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'pokedex',
  templateUrl: './pokedex.html',
  styleUrls: ['./pokedex.scss'],
})
export class Pokedex implements OnInit{
  dto?: PokemonListarDto = {};

  pokemonsAll: PokemonDto[] = [];

  pokemonsShow: PokemonDto[] = [];

  loading = true;

  currentPage: number = 1;

  isModalOpen: boolean = false;

  constructor(private pokeapiService: PokeapiService) {
  }
  
  ngOnInit(): void {
    this.fetchPokemons()
  }
    
  fetchPokemons(){
    this.pokeapiService
      .listarAll()
      .pipe(
        mergeMap((pokemonsResult: any) => pokemonsResult.results),
        mergeMap((pokemonUrl: any) => this.pokeapiService.buscarPokemonData(pokemonUrl.url)),
        mergeMap((pokemonData: any) => {
          const pokeData = pokemonData as PokemonListarResumoDto
          return of({
            id: pokeData.id,
            name: pokeData.name,
            weight: pokeData.weight,
            sprites: pokeData.sprites.other.dream_world.front_default,
            height: pokeData.height,
            types: pokeData.types,
          })
        }),
        toArray(),
        map((pokemons: PokemonDto[]) => {
          this.pokemonsAll = pokemons;
          return pokemons;
        })
      )
      .subscribe((pokemonDto: PokemonDto[]) => {
        this.pokemonsShow = this.pokemonsAll.slice(0,6)
        this.loading = false
      });
  }

  searchPokemon(name:any){
    name = name.target.value.toLowerCase();
    if (!name){
      this.pokemonsShow = this.pokemonsAll.slice(0,6)
      return
    }
    this.pokemonsShow = []
    this.pokeapiService.buscarPokemon(name).subscribe(res => {
      this.pokemonsShow.push({
        id: res.id,
        name: res.name,
        height: res.height,
        weight: res.weight,
        sprites: res.sprites.other.dream_world.front_default,
        types: res.types
      })
    })
  }
  
  changePage(page: number) {
    this.currentPage = page;
    page = page - 1;
    this.pokemonsShow = this.pokemonsAll.slice(page*6,page*6+6)
    console.log(this.pokemonsShow);
    console.log(page);
  }

  openModal(pokemon:PokemonDto){
    console.log(pokemon);
    this.isModalOpen = true
  }
  
}
