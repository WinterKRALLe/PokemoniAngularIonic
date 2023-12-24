import {Component} from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage {
  localStorageData: any;

  constructor() {}

  ionViewDidEnter() {
    this.loadData();
  }

  loadData() {
    const storedData = localStorage.getItem('pokemonData');
    this.localStorageData = storedData ? JSON.parse(storedData) : null;
  }
}
