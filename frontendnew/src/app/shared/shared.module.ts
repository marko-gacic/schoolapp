import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModalModule, NgbNavModule, NgbPaginationModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { SortableHeaderDirective } from './directives/sortable-header.directive';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { GlobalToastComponent } from './components/global-toast/global-toast.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { BootstrapIconsPickModule } from './bootstrap-icons/bootstrap-icons-pick.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    SortableHeaderDirective,
    HeaderComponent,
    GlobalToastComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbPaginationModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbToastModule,
    NgbModalModule,
    BootstrapIconsPickModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule

    
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbToastModule,
    NgbModalModule,
    SortableHeaderDirective,
    HeaderComponent,
    GlobalToastComponent,
    BootstrapIconsPickModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
  

  ]
})
export class SharedModule { }
