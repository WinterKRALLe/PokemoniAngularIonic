import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PokemonsService } from "../../services/pokemons/pokemons.service";
import { Pokemon } from "../../models/pokemon.model";
import { forkJoin } from "rxjs";
import {typeColor} from "../../utils/type-color.util";

@Component({
  selector: 'app-type',
  templateUrl: './type.page.html',
  styleUrls: ['./type.page.scss'],
})
export class TypePage implements OnInit {
  typeName: string | null = null;
  pokemonsOfTypeName: string[] = [];
  pokemonsOfType: Pokemon[] | null = null;
  pokemonsOfTypeCount: number = 0

  isLoading: boolean = false

  constructor(private route: ActivatedRoute, private pokemonService: PokemonsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.typeName = params.get('name');
      if (this.typeName) {
        this.isLoading = true
        this.getPokemonsOfTypeName(this.typeName);
      }
    });
  }

  getPokemonsOfTypeName(name: string) {
    this.pokemonService.GetType$(name).subscribe(data => {
      this.pokemonsOfTypeName = data.pokemon.map(pokemon => pokemon.pokemon.name);
      if (this.pokemonsOfTypeName.length > 0) {
        this.getPokemonsOfType();
      }
    });
  }

  getPokemonsOfType() {
    const requests = this.pokemonsOfTypeName.map((name: string) => this.pokemonService.GetPokemon$(name));

    this.pokemonsOfTypeCount = requests.length

    forkJoin(requests).subscribe({
      next: (data: Pokemon[]) => {
        this.pokemonsOfType = data;
        this.isLoading = false
      },
      error: (forkJoinError: any) => {
        console.error('Error fetching species and damage data:', forkJoinError);
        this.isLoading = false
      }
    });
  }

  capitalizeFirstLetter(word: any): any {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  protected readonly typeColor = typeColor;
}
