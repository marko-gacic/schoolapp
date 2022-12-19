import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-delete-dialog',
    templateUrl: './delete-dialog.component.html',
    styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private snackBar: MatSnackBar) { }

    onDelete() {
        this.data.action()
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-primary']
        });
    }

}