import { Component, Input } from '@angular/core';
import {Pokemon} from "../../models/pokemon.model";

@Component({
  selector: 'app-evolution-item',
  templateUrl: './evolution-item.component.html',
  styleUrls: ['./evolution-item.component.scss'],
})
export class EvolutionItemComponent  {

  @Input() speciesName: Pokemon | null = null;
  @Input() speciesName1: Pokemon | null = null;
  @Input() evoLevel: number | null | undefined = null;

  constructor() { }

}
