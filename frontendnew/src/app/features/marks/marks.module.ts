import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { MarksRoutingModule } from "./marks-routing.module";
import { MarksFormComponent } from "./pages/marks-form/marks-form.component";
import { MarksListComponent } from "./pages/marks-list/marks-list.component";


@NgModule({

    declarations: [
        MarksFormComponent,
        MarksListComponent
    ],
    imports: [
        CommonModule,
        MarksRoutingModule,
        SharedModule
    ]
})


export class MarksModule { }