import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast.service';


export interface ToastMessage {
  classNames: string;
  header: string;
  delay?: number;
  message: string;
}

@Component({
  selector: 'app-global-toast',
  templateUrl: './global-toast.component.html',
  styleUrls: ['./global-toast.component.css']
})
export class GlobalToastComponent implements OnInit {

  constructor(public toastService: ToastService) { }

  ngOnInit(): void {
  }

}