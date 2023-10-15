import { Component, Input, OnInit } from '@angular/core';
import { PokemonDto } from 'src/app/dto/pokemon.dto';

@Component({
  selector: 'pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent  implements OnInit {

  @Input() pokemon?: PokemonDto;

  constructor() { }

  ngOnInit() {
  }

}
