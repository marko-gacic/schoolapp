import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleRoutingModule } from './title-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TitleListComponent } from './pages/title-list/title-list.component';
import { TitleFormComponent } from './pages/title-form/title-form.component';


@NgModule({
    declarations: [
        TitleListComponent,
        TitleFormComponent
    ],
    imports: [
        CommonModule,
        TitleRoutingModule,
        SharedModule
    ]
})
export class TitleModule { }
