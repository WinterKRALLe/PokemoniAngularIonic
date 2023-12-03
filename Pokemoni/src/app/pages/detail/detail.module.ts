import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DetailPageRoutingModule} from './detail-routing.module';

import {DetailPage} from './detail.page';
import {SwiperDirective} from "../../directivies/swiper.directive";
import {register} from "swiper/element/bundle";
import {EvolutionItemComponent} from "../../components/evolution-item/evolution-item.component";

register()

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPageRoutingModule
  ],
    declarations: [DetailPage, SwiperDirective, EvolutionItemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetailPageModule {
}
