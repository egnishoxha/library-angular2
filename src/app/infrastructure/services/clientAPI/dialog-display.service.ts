import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DialogDisplayService {

    bookSource: BehaviorSubject<boolean> = new BehaviorSubject(false);
    authorSource: BehaviorSubject<boolean> = new BehaviorSubject(false);

   
    displayDialog: boolean = false;

    showDialog() {
        this.displayDialog = true;
    }
    hideDialog() {
        this.displayDialog = false;
    }
}

