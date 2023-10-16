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
  private baseUrl = "https://pokeapi.co/api/v2/pokemon/"

  constructor(private http:HttpClient) {}

  buscarPokemonData(url:string): Observable<PokemonListarResumoDto>{
    return this.http.get<PokemonListarResumoDto>(`${url}`);
  }

  buscarPokemon(nome:string): Observable<PokemonListarResumoDto>{
    return this.http.get<PokemonListarResumoDto>(`${this.baseUrl}${nome}`)
  }

  listarAll(): Observable<PokemonListarResumoDto>{
    let params = new HttpParams()

    params = params.set('offset',0).set('limit',151)
    
    return this.http.get<PokemonListarResumoDto>(`${this.baseUrl}`, { params });
  }
}
