import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootstrapIconsModule } from 'ng-bootstrap-icons'
import { Power, Pencil, CardText, Trash, Plus, ArrowLeftCircle, Gear, Person, Question, People, Flag, House } from 'ng-bootstrap-icons/icons';

const icons = {
  Power, Pencil, CardText, Trash, Plus, ArrowLeftCircle, Gear, Person, Question, People, Flag, House
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BootstrapIconsModule.pick(icons)
  ],
  exports: [
    BootstrapIconsModule
  ]
})
export class BootstrapIconsPickModule { }
