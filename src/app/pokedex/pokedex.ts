import { map, mergeMap, of, reduce, toArray } from 'rxjs';
import { PokemonDto } from '../dto/pokemon.dto';
import { PokemonListarDto } from '../dto/pokemon-listar.dto';
import { PokeapiService } from '../services/pokeapi.service';
import { Component, OnInit } from '@angular/core';
import { PokemonListarResumoDto } from '../dto/pokemon-listar-resumo.dto';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'pokedex',
  templateUrl: './pokedex.html',
  styleUrls: ['./pokedex.scss'],
})
export class Pokedex implements OnInit {
  dto?: PokemonListarDto = {};

  pokemonsAll: PokemonDto[] = [];

  pokemonsShow: PokemonDto[] = [];

  pokemon: PokemonDto = {
    id: 0,
    name: '',
    height: 0,
    weight: 0,
    sprites: '',
    types: [],
    spritesPixel: '',
    description: '',
  };

  loading = true;

  currentPage: number = 1;

  isModalOpen: boolean = false;

  constructor(private pokeapiService: PokeapiService) {}

  ngOnInit(): void {
    this.fetchPokemons();
  }

  fetchPokemons() {
    this.pokeapiService
      .listarAll()
      .pipe(
        mergeMap((pokemonsResult: any) => pokemonsResult.results),
        mergeMap((pokemonUrl: any) =>
          this.pokeapiService.buscarPokemonData(pokemonUrl.url)
        ),
        mergeMap((pokemonData: any) => {
          const pokeData = pokemonData as PokemonListarResumoDto;

          return this.pokeapiService.buscarPokemonDescricao(pokeData.id).pipe(
            map((description: any) => ({
              id: pokeData.id,
              name: pokeData.name,
              weight: pokeData.weight,
              spritesPixel: pokeData.sprites.front_default,
              sprites: pokeData.sprites.other.dream_world.front_default,
              height: pokeData.height,
              types: pokeData.types,
              description: description.flavor_text_entries[0].flavor_text, // Set the description here
            }))
          );
        }),
        toArray(),
        map((pokemons: PokemonDto[]) => {
          this.pokemonsAll = pokemons;
          return pokemons;
        })
      )
      .subscribe((poke: any) => {
        console.log(poke);

        this.pokemonsShow = this.pokemonsAll.slice(0, 6);
        this.loading = false;
      });
  }

  searchPokemon(name: any) {
    name = name.target.value.toLowerCase();
    if (!name) {
      this.pokemonsShow = this.pokemonsAll.slice(0, 6);
      return;
    }
    this.pokemonsShow = [];
    this.pokeapiService.buscarPokemon(name).pipe(
      mergeMap((res: any) => {
        return this.pokeapiService.buscarPokemonDescricao(res.id).pipe(
          map((description: any) => ({
            id: res.id,
            name: res.name,
            weight: res.weight,
            spritesPixel: res.sprites.front_default,
            sprites: res.sprites.other.dream_world.front_default,
            height: res.height,
            types: res.types,
            description: description.flavor_text_entries[0].flavor_text
          }))
        );
      })
    )
    .subscribe((pokemonWithDescription: any) => {
      console.log(pokemonWithDescription);
      
      this.pokemonsShow.push(pokemonWithDescription);
    });
  }
  
  changePage(page: number) {
    this.currentPage = page;
    page = page - 1;
    this.pokemonsShow = this.pokemonsAll.slice(page * 6, page * 6 + 6);
  }

  openModal(pokemon: PokemonDto) {
    this.pokemon = pokemon;
    this.isModalOpen = true;
  }
}
