import {Component, AfterViewChecked, ViewChild} from '@angular/core';
import {IonInput, ModalController} from '@ionic/angular';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements AfterViewChecked {
  searchTerm: string = ""
  searchResults: string[] = [];
  focusIsSet!: boolean;
  @ViewChild('searchInput', {static: false}) searchInput!: IonInput;

  constructor(private modalController: ModalController, private http: HttpClient) {
  }

  public ngAfterViewChecked(): void {
    if (!this.focusIsSet) {
      this.searchInput.setFocus();
      setTimeout(() => {this.focusIsSet = true; }, 1000);
    }
  }
  dismiss() {
    this.modalController.dismiss();
  }

  searchChanged(): void {
    if (this.searchTerm.length > 2) {
      this.handleSearch();
    } else {
      this.searchResults = [];
    }
  }

  handleSearch(): void {
    this.http.get('assets/pokemon_names.txt', {responseType: 'text'})
      .subscribe({
        next: (data: string) => {
          this.searchResults = data
            .split('\n')
            .filter((name) => name.toLowerCase().includes(this.searchTerm.toLowerCase()))
            .slice(0, 10);
        },
        error: (error) => {
          console.error('Error occurred while searching:', error);
        }
      });
  }
}
