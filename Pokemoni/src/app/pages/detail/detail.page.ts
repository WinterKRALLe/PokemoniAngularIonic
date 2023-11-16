import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokemonsService} from '../../services/pokemons/pokemons.service';
import {Pokemon} from "../../models/pokemon.model";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  pokemonName: string | null = "";
  pokemonDetails: any; // Assuming GetPokemon$ returns a single Pokémon
  constructor(private route: ActivatedRoute, private pokemonService: PokemonsService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pokemonName = params.get('name');
        if (this.pokemonName != null) {
            this.pokemonService.GetPokemon$(this.pokemonName).subscribe((data: any) => {
                this.pokemonDetails = data;
            });
        }
    });
  }

    protected readonly JSON = JSON;
}
