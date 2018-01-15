import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { IAuthor } from "../../dataModel/Author";
import { IAuthorAddEditRequest } from "./../../infrastructure/services/webAPI/AuthorAddEditRequest";

import { UserService } from "./../../infrastructure/services/webAPI/user.service";
import { DialogDisplayService } from "../../infrastructure/services/clientAPI/dialog-display.service";

@Component({
    selector: 'add-author-form',
    templateUrl: './add-author-form.component.html',
    styleUrls: ['./add-author-form.component.css']
})

export class AddAuthorFormComponent implements OnInit {

    private authorCreateRequest: IAuthorAddEditRequest = {};  
    private authors: IAuthor[] = [];
    private isVisible: boolean = false;
    
    constructor(
        private _dialogDisplayService: DialogDisplayService,
        private _userService: UserService    
    ) { 

    }

    ngOnInit() {
        this.authorCreateRequest = {
            firstName: "",
            lastName: "",
            gendre: "",
            nationality: ""
        };
    }

    addAuthor(createRequest: IAuthorAddEditRequest, isValid: boolean, form:NgForm) {
        if (isValid) {
            this._userService.createAuthor(createRequest).subscribe(
                data => {
                    alert("Author added successfully!");
                    this._userService.getAllAuthors().subscribe(
                        (authors: IAuthor[]) => { this.authors = authors; },
                        (error) => { alert("ERROR: Authors couldn't be loaded!"); }
                    );
                    this._dialogDisplayService.hideDialog();
                },
                error => { alert("ERROR: Author couldn't be created!"); }
            )                
            this._dialogDisplayService.hideDialog();
        } else {
            alert("ERROR: Author couldn't be added!");
        }
        form.reset();
    }
}
