import {AfterViewInit, Component, ElementRef, NgZone, Renderer2, ViewChild} from '@angular/core';
import {PokemonsService} from "../../services/pokemons/pokemons.service";
import {forkJoin} from 'rxjs';
import {typeColor} from "../../utils/type-color.util";
import {IonContent, ModalController} from "@ionic/angular";
import {SearchPage} from "../search/search.page";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements AfterViewInit{
  @ViewChild(IonContent, { static: false }) content!: IonContent;
  @ViewChild('button', { static: false, read: ElementRef }) button!: ElementRef;
  showButton = true;
  lastScrollTop = 0;

  data: any = {}

  pokemons: any[] = [];
  pokemonDetails: any[] = [];
  offset: number = 0;
  limit: number = 12;

  constructor(private renderer: Renderer2, private pokemonService: PokemonsService, private modalController: ModalController, private ngZone: NgZone) {
    this.loadPokemons();
  }

  ngAfterViewInit() {
    this.content.ionScroll.subscribe((event: any) => this.onContentScroll(event));
  }

  onContentScroll(event: any) {
    this.ngZone.run(() => {
      const currentScrollTop = event.detail.scrollTop;

      // Check the scroll direction
      if (currentScrollTop > this.lastScrollTop) {
        // Scrolling down
        if (this.showButton) {
          this.renderer.setStyle(this.button.nativeElement, 'display', 'none');
          this.showButton = false;
        }
      } else {
        // Scrolling up
        if (!this.showButton) {
          this.renderer.setStyle(this.button.nativeElement, 'display', 'block');
          this.showButton = true;
        }
      }

      this.lastScrollTop = currentScrollTop;
    });
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

  openSearch = async () => {
    const modal = await this.modalController.create({
      component: SearchPage,
    });
    return await modal.present();
  };

  protected readonly typeColor = typeColor;
}
