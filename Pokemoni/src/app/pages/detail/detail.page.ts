import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokemonsService} from '../../services/pokemons/pokemons.service';
import {Pokemon} from "../../models/pokemon.model";
import {typeColor} from "../../utils/type-color.util";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  pokemonName: string | null = "";
  pokemonDetails: Pokemon | null = null;
  image: string | undefined = ""
  weightInLbsAndKg: { lbs: number; kg: number } | null = null;
  heightInFeetInchesAndMeters: { feet: number; inches: string; meters: string } | null = null;
  type: string = ""
  typeColor: string = ""
  typeIcon: string = ""
  secondType: string = ""
  secondTypeColor: string = ""
  secondTypeIcon: string = "";


  constructor(private route: ActivatedRoute, private pokemonService: PokemonsService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pokemonName = params.get('name');
      if (this.pokemonName != null) {
        this.pokemonService.GetPokemon$(this.pokemonName).subscribe((data: Pokemon): void => {
          this.pokemonDetails = data;
          this.type = this.pokemonDetails ? this.pokemonDetails.types[0].type.name : "nic nebude"
          this.typeColor = this.type ? `${typeColor(this.type)}` : "nic nebude"
          this.typeIcon = this.iconPath(this.type);
          this.secondType = this.pokemonDetails && this.pokemonDetails.types[1] ? this.pokemonDetails.types[1].type.name : "nic nebude";
          this.secondTypeColor = this.secondType ? `${typeColor(this.secondType)}` : "nic nebude";
          this.secondTypeIcon = this.iconPath(this.secondType)

          this.calculateWeightInLbsAndKg();
          this.getImage()
          this.convertCmToFeetInches(this.pokemonDetails.height * 10)

        });
      }
    });
  }

  iconPath(type: string): string {
    return `assets/icons/${type}.svg`;
  }

  getImage(): void {
    if (this.pokemonDetails) {
      const sprites = this.pokemonDetails.sprites;
      if (sprites && sprites.other) {
        const officialArtwork = sprites.other["official-artwork"];
        if (officialArtwork) {
          this.image = officialArtwork.front_default;
        }
      }
    }
  }

  calculateWeightInLbsAndKg(): void {
    if (this.pokemonDetails) {
      const lbPerKg = 2.20462;
      const kg = this.pokemonDetails.weight / 10;
      const lbs = kg * lbPerKg;
      this.weightInLbsAndKg = {lbs, kg};
    }
  }

  convertCmToFeetInches(cm: number): void {
    if (this.pokemonDetails) {
      const inchesPerCm = 0.393701;
      const totalInches = cm * inchesPerCm;
      const feet = Math.floor(totalInches / 12);
      let restInches = Math.round(totalInches % 12); // Round to the nearest whole number
      const meters = (cm / 100).toFixed(2);
      const inches = restInches < 10 ? `0${restInches}` : restInches.toString();
      this.heightInFeetInchesAndMeters = {feet, inches, meters};
    }
  }
}
