import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from "../../models/pokemon.model";
import {EvoChain} from "../../models/pokemonEvolutionChain.model";
import {HttpClient} from "@angular/common/http";
import {PokemonsService} from "../../services/pokemons/pokemons.service";

@Component({
  selector: 'app-evolution-item',
  templateUrl: './evolution-item.component.html',
  styleUrls: ['./evolution-item.component.scss'],
})
export class EvolutionItemComponent implements OnInit {

  @Input() pokemonDetails: Pokemon | null = null
  @Input() evolutionURL: string | undefined
  pokemonName: string | undefined = this.pokemonDetails?.name
  evolutionChain: EvoChain | null = null

  firstEvo: Pokemon | null = null
  secondEvo: Pokemon | null = null
  thirdEvo: Pokemon | null = null

  first2secondLevel: number | null = null
  second2thirdLevel: number | null | undefined = null

  constructor(private http: HttpClient, private pokemonService: PokemonsService) {
  }

  ngOnInit() {
    if (this.evolutionURL) {
      this.http.get<EvoChain>(this.evolutionURL).subscribe({
        next: (evolutionData: EvoChain) => {
          this.evolutionChain = evolutionData;
          this.getEvos()
          this.first2secondLevel = this.evolutionChain?.chain?.evolves_to[0]?.evolution_details[0]?.min_level
          this.second2thirdLevel = this.evolutionChain?.chain?.evolves_to[0]?.evolves_to[0]?.evolution_details[0]?.min_level
        },
        error: (evolutionError: any) => {
          console.error('Error fetching evolution chain:', evolutionError);
        }
      });
    }
  }

  getEvos(): void {
    if (this.evolutionChain && this.evolutionChain.chain.evolves_to.length > 0) {
      const firstEvoName: string | undefined = this.evolutionChain.chain.species.name;
      const secondEvoName: string | undefined = this.evolutionChain.chain.evolves_to[0].species.name;
      // this.first2secondLevel = this.evolutionChain.chain.evolves_to[0].evolution_details[0].min_level;

      if (firstEvoName && firstEvoName != this.pokemonName) {
        this.pokemonService.GetPokemon$(firstEvoName).subscribe((firstEvolutionPokemon: any) => {
          this.firstEvo = firstEvolutionPokemon
        });
      } else {
        this.firstEvo = this.pokemonDetails
      }

      if (secondEvoName && secondEvoName !== this.pokemonName) {
        this.pokemonService.GetPokemon$(secondEvoName).subscribe((secondEvolutionPokemon: any) => {
          this.secondEvo = secondEvolutionPokemon
        });
      } else {
        this.secondEvo = this.pokemonDetails
      }

      if (this.evolutionChain.chain.evolves_to[0].evolves_to.length !== 0) {
        const thirdEvoName: string | undefined = this.evolutionChain?.chain.evolves_to[0].evolves_to[0].species.name;
        if (thirdEvoName && thirdEvoName !== this.pokemonName) {
          this.pokemonService.GetPokemon$(thirdEvoName).subscribe((thirdEvolutionPokemon: any) => {
            this.thirdEvo = thirdEvolutionPokemon
            this.second2thirdLevel = this.evolutionChain?.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level
          });
        } else {
          this.thirdEvo = this.pokemonDetails
        }
      }
    }
  }

}
