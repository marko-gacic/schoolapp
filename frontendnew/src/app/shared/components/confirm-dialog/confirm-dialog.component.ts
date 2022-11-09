import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmOptions } from 'src/app/core/models/enums';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  header?: string;
  message?: string;

  confirmOptions = ConfirmOptions;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}