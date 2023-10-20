import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent  implements OnInit {

  @Input() currentPage: number = 1;
  @Input() total: number = 0;
  @Input() limit: number = 20;
  @Output() changePage = new EventEmitter<number>();

  pages: number [] = [];

  constructor() { }

  ngOnInit() {
    const pagesCount = Math.ceil(this.total / this.limit);
    this.pages = this.range(1, pagesCount);
  }

  range(start:number, end:number): number[]{
    return [...Array(end).keys()].map(el => el + start)
  }

}
