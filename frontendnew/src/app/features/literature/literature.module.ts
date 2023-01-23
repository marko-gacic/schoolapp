import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { LiteratureFormComponent } from "./pages/literature-form/literature-form.component";
import { LiteratureListComponent } from "./pages/literature-list/literature-list.component";
import { LiteratureRoutingModule } from "./literature-routing.module";


@NgModule({
    declarations: [
        LiteratureFormComponent,
        LiteratureListComponent
    ],
    imports: [
        CommonModule,
        LiteratureRoutingModule,
        SharedModule
    ]
})
export class LiteratureModule { }
