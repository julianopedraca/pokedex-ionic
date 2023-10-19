import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { PokeapiService } from '../services/pokeapi.service';
import { PokemonDto } from '../dto/pokemon.dto';
import { Pokedex } from './pokedex';

import { mockpokemonmodal } from "./mock-pokemon-modal";

describe('PokedexComponent', () => {
  let component: Pokedex;
  let fixture: ComponentFixture<Pokedex>;
  let pokeapiService: jasmine.SpyObj<PokeapiService>;

  beforeEach(() => {
    const pokeapiSpy = jasmine.createSpyObj('PokeapiService', ['listar', 'buscarPokemonData', 'buscarPokemon', 'buscarPokemonDescricao']);

    TestBed.configureTestingModule({
      declarations: [Pokedex],
      providers: [{ provide: PokeapiService, useValue: pokeapiSpy }]
    });

    fixture = TestBed.createComponent(Pokedex);
    component = fixture.componentInstance;
    pokeapiService = TestBed.inject(PokeapiService) as jasmine.SpyObj<PokeapiService>;
  });


  it('should open modal with a pokemon', () => {
    const mockPokemon: PokemonDto = mockpokemonmodal;
    
    component.openModal(mockPokemon);

    expect(component.isModalOpen).toBe(true);
    expect(component.pokemon).toEqual(mockPokemon);
  });
});
