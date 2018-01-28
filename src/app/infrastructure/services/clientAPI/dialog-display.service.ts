import { Injectable } from '@angular/core';

@Injectable()
export class DialogDisplayService {

    displayDialog: boolean = false;

    showDialog() {
        this.displayDialog = true;
    }
    hideDialog() {
        this.displayDialog = false;
    }
}

