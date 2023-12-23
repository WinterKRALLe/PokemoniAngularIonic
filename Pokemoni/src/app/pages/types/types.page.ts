import { Component, OnInit } from '@angular/core';
import {PokemonsService} from "../../services/pokemons/pokemons.service";
import {Types} from "../../models/types.model";
import {typeColor} from "../../utils/type-color.util";

@Component({
  selector: 'app-types',
  templateUrl: './types.page.html',
  styleUrls: ['./types.page.scss'],
})
export class TypesPage implements OnInit {
  allTypes: string[] = []

  constructor(private pokemonService: PokemonsService) { }

  ngOnInit() {
    this.getDamage()
  }

  getDamage() {
    this.pokemonService.GetTypes$().subscribe((data: Types) => {
      this.allTypes = data.results
        .map(type => type.name)
        .filter(type => type !== 'unknown' && type !== 'shadow');
    })
  }

  protected readonly typeColor = typeColor;
}
