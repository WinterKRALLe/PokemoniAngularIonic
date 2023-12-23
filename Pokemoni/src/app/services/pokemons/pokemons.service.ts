import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {PokemonList} from "../../models/pokemonList.model";
import {Pokemon} from "../../models/pokemon.model";
import {Species} from "../../models/pokemonSpecies.model";
import {Observable} from "rxjs";
import {Damage} from "../../models/pokemonDamage.model";
import {Types} from "../../models/types.model";
import {Type} from "../../models/type.model";

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

  GetPokemonDamage$(name: string): Observable<Damage> {
    const url: string = `${environment.POKE_URL}type/${name}`
    return this.http.get<Damage>(url)
  }

  GetTypes$(): Observable<Types> {
    const url: string = `${environment.POKE_URL}type`
    return this.http.get<Types>(url)
  }

  GetType$(name: string): Observable<Type> {
    const url: string = `${environment.POKE_URL}type/${name}`
    return this.http.get<Type>(url)
  }
}
