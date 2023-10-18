import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { createHttpParams } from '../utils/http-utils';

import { PokemonListarDto } from '../dto/pokemon-listar.dto';
import { PokemonListarResumoDto } from '../dto/pokemon-listar-resumo.dto';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private baseUrl = "https://pokeapi.co/api/v2"

  constructor(private http:HttpClient) {}

  buscarPokemonData(url:string): Observable<PokemonListarResumoDto>{
    return this.http.get<PokemonListarResumoDto>(`${url}`);
  }

  buscarPokemonDescricao(id:number): Observable<PokemonListarResumoDto>{
    return this.http.get<PokemonListarResumoDto>(`${this.baseUrl}/pokemon-species/${id}`)
  }

  buscarPokemon(nome:string): Observable<PokemonListarResumoDto>{
    return this.http.get<PokemonListarResumoDto>(`${this.baseUrl}/pokemon/${nome}`)
  }

  listar(offset:number): Observable<PokemonListarResumoDto>{
    let params = new HttpParams()
    let limit = 6

    if (offset>=150)   
      limit = 1

    params = params.set('offset',offset).set('limit',limit)
    
    return this.http.get<PokemonListarResumoDto>(`${this.baseUrl}/pokemon/`, { params });
  }
}
