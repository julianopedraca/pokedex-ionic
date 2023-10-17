import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokemonDto } from 'src/app/dto/pokemon.dto';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  implements OnInit {
  
  @Input()
  isModalOpen = false;

  @Input()
  pokemonData:PokemonDto = {
    id: 0,
    name: '',
    height: 0,
    weight: 0,
    sprites: '',
    types: [],
    spritesPixel: '',
    description: ''
  }

  @Output()
  isModalOpenChange = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit() {
    console.log(this.pokemonData);
    
  }

  closeModal(){
    this.isModalOpenChange.emit(false);
  }
}
