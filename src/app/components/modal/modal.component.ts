import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  implements OnInit {
  
  @Input()
  isModalOpen = false;

  @Output()
  isModalOpenChange = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit() {}

  closeModal(){
    this.isModalOpenChange.emit(false);
  }
}
