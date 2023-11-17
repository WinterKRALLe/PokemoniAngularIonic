import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {PokemonList} from "../../models/pokemonList.model";
import {Pokemon} from "../../models/pokemon.model";
import {Species} from "../../models/pokemonSpecies.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  detail?: PokemonList;

  constructor(
    private http: HttpClient
  ) {
  }

  GetAllPokemons$(offset: number, limit: number): Observable<PokemonList> {
    const url = `${environment.POKE_URL}pokemon?offset=${offset}&limit=${limit}`;
    return this.http.get<PokemonList>(url);
  }

  GetPokemon$(name: string): Observable<Pokemon> {
    const url: string = `${environment.POKE_URL}pokemon/${name}`
    return this.http.get<Pokemon>(url)
  }

  GetPokemonSpecies$(name: string): Observable<Species> {
    const url: string = `${environment.POKE_URL}pokemon-species/${name}`
    return this.http.get<Species>(url)
  }
}
