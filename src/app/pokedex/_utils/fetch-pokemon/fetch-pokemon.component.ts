import { map, mergeMap, toArray } from 'rxjs';
import { PokemonListarResumoDto } from 'src/app/dto/pokemon-listar-resumo.dto';
import { PokemonListarDto } from 'src/app/dto/pokemon-listar.dto';
import { PokemonDto } from 'src/app/dto/pokemon.dto';
import { PokeapiService } from 'src/app/services/pokeapi.service';

export class FetchPokemonComponent {
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
    stats: []
  };

  loading = true;

  constructor(public pokeapiService: PokeapiService) { }

  fetchPokemons(offset:number=0) {
    this.loading = true;
    this.pokeapiService
      .listar(offset)
      .pipe(
        mergeMap((pokemonsResult: any) => pokemonsResult.results),
        mergeMap((pokemonUrl: any) =>
          this.pokeapiService.buscarPokemonData(pokemonUrl.url)
        ),
        mergeMap((pokemonData: any) => {
          console.log(pokemonData);
          
          const pokeData = pokemonData as PokemonListarResumoDto;

          return this.pokeapiService.buscarPokemonDescricao(pokeData.id).pipe(
            map((description: any) => ({
              id: pokeData.id,
              name: pokeData.name,
              weight: pokeData.weight/10,
              spritesPixel: pokeData.sprites.front_default,
              sprites: pokeData.sprites.other.dream_world.front_default,
              height: pokeData.height/10,
              types: pokeData.types,
              stats: pokeData.stats,
              description: description.flavor_text_entries[0].flavor_text.replace(/[\n\f]/g, ' '), // Set the description here
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
      this.fetchPokemons()
      return;
    }
    this.pokemonsShow = [];
    this.pokeapiService.buscarPokemon(name).pipe(
      mergeMap((res: any) => {
        return this.pokeapiService.buscarPokemonDescricao(res.id).pipe(
          map((description: any) => ({
            id: res.id,
            name: res.name,
            weight: res.weight/10,
            spritesPixel: res.sprites.front_default,
            sprites: res.sprites.other.dream_world.front_default,
            height: res.height/10,
            types: res.types,
            stats: res.stats,
            description: description.flavor_text_entries[0].flavor_text.replace(/[\n\f]/g, ' ')
          }))
        );
      })
    )
    .subscribe((pokemonWithDescription: any) => {
      console.log(pokemonWithDescription);
      
      this.pokemonsShow.push(pokemonWithDescription);
    });
  }

}
