import { Injectable } from "@angular/core";
import { ToastMessage } from "src/app/shared/components/global-toast/global-toast.component";

@Injectable({
    providedIn: "root",
})
export class ToastService {
    showError(arg0: string) {
        throw new Error('Method not implemented.');
    }
    showSuccess(arg0: string) {
        throw new Error('Method not implemented.');
    }
    messages: ToastMessage[] = [];

    constructor() { }

    showToast(message: ToastMessage) {
        this.messages.push(message);
    }

    removeToast(index: number) {
        this.messages.splice(index, 1);
    }
}