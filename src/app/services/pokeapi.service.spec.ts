import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PokeapiService } from './pokeapi.service';

import { mockfetchpokemondata } from "./mocks/mock-fetch-pokemon-data";
import { mocksearchpokemondescription } from "./mocks/mock-search-pokemon-description";
import { mocksearchpokemon } from "./mocks/mock-search-pokemon";
import { mocklistpokemon } from "./mocks/mock-list-pokemon";

describe('PokeapiService', () => {
  let service: PokeapiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokeapiService]
    });

    service = TestBed.inject(PokeapiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch Pokemon data by URL', () => {
    const mockUrl = 'https://pokeapi.co/api/v2/pokemon/1';
    const mockFetchPokemonData: any = mockfetchpokemondata;

    service.buscarPokemonData(mockUrl).subscribe(data => {
      expect(data).toEqual(mockFetchPokemonData);
    });

    const req = httpMock.expectOne(mockUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockFetchPokemonData);
  });

  it('should fetch Pokemon description by ID', () => {
    const mockId = 1;
    const mockSearchPokemonDescription: any = mocksearchpokemondescription;

    service.buscarPokemonDescricao(mockId).subscribe(data => {
      expect(data).toEqual(mockSearchPokemonDescription);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/pokemon-species/${mockId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSearchPokemonDescription);
  });

  it('should fetch Pokemon by name', () => {
    const mockName = 'pikachu';
    const mockSearchPokemon: any = mocksearchpokemon;

    service.buscarPokemon(mockName).subscribe(data => {
      expect(data).toEqual(mockSearchPokemon);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/pokemon/${mockName}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSearchPokemon);
  });

  it('should list Pokemon with offset', () => {
    const mockOffset = 0;
    const mockListPokemon: any = mocklistpokemon;

    service.listar(mockOffset).subscribe(data => {
      expect(data).toEqual(mockListPokemon);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/pokemon/?offset=${mockOffset}&limit=6`);
    expect(req.request.method).toBe('GET');
    req.flush(mockListPokemon);
  });
});
