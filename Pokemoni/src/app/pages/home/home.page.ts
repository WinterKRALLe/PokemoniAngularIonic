import { Component } from '@angular/core';
import { PokemonsService } from "../../services/pokemons/pokemons.service";
import { forkJoin } from 'rxjs';
import {PokemonList} from "../../models/pokemonList.model";
import {Pokemon} from "../../models/pokemon.model";
import {typeColor} from "../../utils/type-color.util";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  data: any = {}

  pokemons: any[] = [];
  pokemonDetails: any = [];
  offset = 0;
  limit = 12;

  constructor(private pokemonService: PokemonsService) {
    this.loadPokemons();
  }

  loadPokemons(event?: any): void {
    this.pokemonService.GetAllPokemons$(this.offset, this.limit)
        .subscribe((data: any) => {
          const pokemonDetailsObservables = data.results.map((pokemon: any) => {
            return this.pokemonService.GetPokemon$(pokemon.name);
          });

          forkJoin(pokemonDetailsObservables).subscribe(pokemonDetails => {
            this.pokemonDetails = this.pokemonDetails.concat(pokemonDetails);
            this.pokemons = this.pokemons.concat(data.results);
            this.offset += this.limit;

            if (event) {
              event.target.complete();
            }
          });
        });
  }

  loadMore(event: any): void {
    this.loadPokemons(event);
  }

  /*
  getPokemonTypes(pokemon: Pokemon): string[] {
    return pokemon.types.map(t => t.type.name)
  }
  */

  getTypeColor(pokemon: Pokemon): string {
    const type = pokemon.types.length > 0 ? pokemon.types[0].type.name : 'default';
    return `rgb(${typeColor(type)}) !important`;
  }

  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
