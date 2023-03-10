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
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';


const globalRippleConfig: RippleGlobalOptions = {
  disabled: false,
  animation: {
    enterDuration: 200,
    exitDuration: 0
  }
};


@NgModule({
  declarations: [
    SortableHeaderDirective,
    HeaderComponent,
    GlobalToastComponent,
    ConfirmDialogComponent,
    DeleteDialogComponent,
    SideNavComponent,


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
    MatDatepickerModule,
    TranslateModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,






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
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    ConfirmDialogComponent,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatSelectModule,
    DeleteDialogComponent,
    SideNavComponent,
    FormsModule,
    ReactiveFormsModule,






  ],
  providers: [{ provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig }],


})
export class SharedModule { }
