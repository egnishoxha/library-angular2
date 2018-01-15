import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ConfirmDialogModule, ConfirmationService } from "primeng/primeng";

import { IAuthor } from "../../dataModel/Author";
import { IAuthorAddEditRequest } from "./../../infrastructure/services/webAPI/AuthorAddEditRequest";

import { UserService } from './../../infrastructure/services/webAPI/user.service';
import { DialogDisplayService } from "../../infrastructure/services/clientAPI/dialog-display.service";


@Component({
    selector: 'app-authors',
    templateUrl: './authors.component.html',
    styleUrls: ['./authors.component.css']
})

export class AuthorsComponent implements OnInit {
    
    private authors: IAuthor[] = [];
    private authorId: number;
    private authorEditRequest: IAuthorAddEditRequest = {};
    private displayEdit: boolean = false;
    refreshTab: boolean = false;

    constructor(
        private _userService: UserService,
        private _confirmationService: ConfirmationService,
        private _dialogDisplayService: DialogDisplayService        
    ) {

    }

    ngOnInit() {
        this.loadAuthors();
    }
    
    //get all authors
    loadAuthors(){
        this._userService.getAllAuthors()
            .subscribe(
                (authors: IAuthor[]) => { this.authors = authors; console.log("load authors API: ", this.authors); },
                (error) => { alert("ERROR: Author couldn't be loaded!"); }
            );
    }
 
    //delete author
    removeAuthor(author){
        this._confirmationService.confirm({
            message: `Are you sure you want to remove <b>${author.fullName}</b>?`,
            accept: () => {
                this._userService.deleteAuthor(author.id)
                .subscribe(
                    data => {
                        console.log("Author deleted successfully!");
                        alert("Author deleted successfully!");
                        this.loadAuthors();                                         
                    },
                    error => {
                        console.log("error API Delete author: ", error);
                        alert("ERROR: Author couldn't be deleted!");
                    }
                    
                );
            }
        });
    }

    // show/edit EDIT dialog
    showEditDialog(author) {
        this.authorId = author.id;
        this.authorEditRequest = {
            firstName: author.firstName,
            lastName: author.lastName,
            nationality: author.nationality,
            gendre: author.gendre
        };        
        this.displayEdit = true;
    }

    hideEditDialog() {
        this.displayEdit = false;
    }

    //edit author
    saveAuthor(form: NgForm) {
        if (form.valid) {
            this._userService.updateAuthor(this.authorId, this.authorEditRequest)
                .subscribe(
                    data => {
                        alert("Author updated  successfully!");
                        this.loadAuthors();                      
                    },
                    error => {
                        console.log("error API Update author: ", error);
                        alert("ERROR: Author couldn't be updated!");
                    }
                );
            this.displayEdit = false;
        }
    }
}
