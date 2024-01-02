import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  pokemonData: any[] = [];

  constructor() {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const storedData = localStorage.getItem('pokemonData');
    this.pokemonData = storedData ? JSON.parse(storedData) : null;
  }

  refresh() {
   window.location.reload()
  }
}
