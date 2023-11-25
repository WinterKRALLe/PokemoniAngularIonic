import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokemonsService} from '../../services/pokemons/pokemons.service';
import {OfficialArtwork, Pokemon, Sprites} from "../../models/pokemon.model";
import {typeColor} from "../../utils/type-color.util";
import {Species} from "../../models/pokemonSpecies.model";
import {Damage} from "../../models/pokemonDamage.model";
import {forkJoin} from "rxjs";
import {SwiperContainer} from "swiper/swiper-element";
import {SwiperOptions} from "swiper/types";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, AfterViewInit {
  @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;
  @ViewChild('swiperThumbs') swiperThumbs!: ElementRef<SwiperContainer>;

  pokemonName: string | null = "";
  pokemonId: number | null = null
  pokemonDetails: Pokemon | null = null;
  pokemonSpecies: Species | null = null
  pokemonWeaknesses: Damage | null = null
  image: string | undefined = ""
  weightInLbsAndKg: { lbs: number; kg: number } | null = null;
  heightInFeetInchesAndMeters: { feet: number; inches: string; meters: string } | null = null;
  type: string = ""
  firstTypeColor: string = ""
  typeIcon: string = ""
  secondType: string = ""
  secondTypeColor: string = ""
  secondTypeIcon: string = ""
  doubleDamageFrom: any[] = []
  halfDamageFrom: any[] = []
  index: number = 0
  swiperConfig: SwiperOptions = {
    spaceBetween: 10,
  };

  swiperThumbsConfig: SwiperOptions = {
    spaceBetween: 10,
    slidesPerView: 2,
    freeMode: true,
    watchSlidesProgress: true,
  };

  constructor(private route: ActivatedRoute, private pokemonService: PokemonsService) {
  }

  ngAfterViewInit() {
      this.swiper.nativeElement.swiper.activeIndex = this.index;
      this.swiperThumbs.nativeElement.swiper.activeIndex = this.index;
  }

    ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pokemonName = params.get('name');
      if (this.pokemonName != null) {
        this.pokemonService.GetPokemon$(this.pokemonName).subscribe((data: Pokemon): void => {
          this.pokemonDetails = data;
          this.type = this.pokemonDetails ? this.pokemonDetails.types[0].type.name : ""
          this.firstTypeColor = this.type !== "" ? `${typeColor(this.type)}` : ""
          this.typeIcon = this.iconPath(this.type);
          this.secondType = this.pokemonDetails && this.pokemonDetails.types[1] ? this.pokemonDetails.types[1].type.name : "";
          this.secondTypeColor = this.secondType !== "" ? `${typeColor(this.secondType)}` : "";
          this.secondTypeIcon = this.iconPath(this.secondType)

          this.pokemonId = this.pokemonDetails?.id

          this.calculateWeightInLbsAndKg();
          this.getImage()
          this.convertCmToFeetInches(this.pokemonDetails.height * 10)

          if (this.pokemonName != null) {
            forkJoin([
              this.pokemonService.GetPokemonSpecies$(this.pokemonName),
              this.pokemonService.GetPokemonDamage$(this.pokemonId)
            ]).subscribe(([speciesData, damageData]: [any, any]) => {
              this.pokemonSpecies = speciesData;
              this.pokemonWeaknesses = damageData;

              this.updateDamage();
            });
          }
        });
      }
    });
  }

  slideChange(swiper: any) {
    this.index = swiper.detail[0].activeIndex;
  }

  iconPath(type: string): string {
    return `assets/icons/${type}.svg`;
  }

  getImage(): void {
    if (this.pokemonDetails) {
      const sprites: Sprites = this.pokemonDetails.sprites;
      if (sprites && sprites.other) {
        const officialArtwork: OfficialArtwork = sprites.other["official-artwork"];
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

  formatStatName(statName: string): string {
    return statName
      .replace("special-attack", "SATK")
      .replace("special-defense", "SDEF")
      .replace("hp", "HP")
      .replace("attack", "ATK")
      .replace("defense", "DEF")
      .replace("speed", "SPD")
    //.replace(/(\b\w)/g, match => match.toUpperCase());
  }

  updateDamage(): void {
    if (this.pokemonWeaknesses) {
      this.doubleDamageFrom = this.pokemonWeaknesses?.damage_relations.double_damage_from.map(
        (type: any) => type.name
      );
      this.halfDamageFrom = this.pokemonWeaknesses?.damage_relations.half_damage_from.map(
        (type: any) => type.name
      );
    }
  }

  protected readonly typeColor = typeColor;
}
