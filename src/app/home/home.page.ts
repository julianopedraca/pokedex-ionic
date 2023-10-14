import { map, mergeMap, of, reduce, toArray } from 'rxjs';
import { PokemonDto } from '../dto/pokemon.dto';
import { PokemonListarDto } from './../dto/pokemon-listar.dto';
import { PokeapiService } from './../services/pokeapi.service';
import { Component, OnInit } from '@angular/core';
import { PokemonListarResumoDto } from '../dto/pokemon-listar-resumo.dto';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  dto?: PokemonListarDto = {};

  pokemons: PokemonDto[] = [];

  loading = true

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
            height: pokeData.weight,
            types: pokeData.types,
          })
        }),
        toArray(),
        map((pokemons: PokemonDto[]) => {
          this.pokemons = pokemons;
          return pokemons;
        })
      )
      .subscribe((pokemonDto: PokemonDto[]) => {
        this.loading = false
      });
  }

  swiperSlideChange(e:any){
    console.log('changed', e);
    
  }
}
