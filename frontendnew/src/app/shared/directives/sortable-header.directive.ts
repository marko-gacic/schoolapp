import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';


export type SortDirection = 'ASC' | 'DESC'| '';

export type SortEvent = {
  columnName: string;
  direction: SortDirection
}

@Directive({
  selector: 'th[sortable]'
})
export class SortableHeaderDirective {


  @Input() sortable = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();
  constructor() { }


  @HostBinding('class.asc')
  get ascClass() {
    return this.direction === 'ASC';
  }

  @HostBinding('class.desc')
  get descClass() {
    return this.direction === 'DESC';
  }


  @HostListener('click')
  onSort() {
    if (!this.direction) {
      this.direction = 'ASC';
    } else if (this.direction === 'ASC') {
      this.direction = 'DESC'
    } else {
      this.direction = ''
    }


    console.log('Click event on a host element', this.sortable, this.direction);


    this.sort.emit({columnName: this.sortable, direction: this.direction});
  }


}
