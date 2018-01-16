import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { IBookAddEditRequest } from "./../../infrastructure/services/webAPI/BookAddEditRequest";
import { IBook } from "../../dataModel/Book";
import { IAuthor } from "../../dataModel/Author";
import { DialogDisplayService } from "../../infrastructure/services/clientAPI/dialog-display.service";
import { UserService } from "./../../infrastructure/services/webAPI/user.service";

@Component({
    selector: 'add-book-form',
    templateUrl: './add-book-form.component.html',
    styleUrls: ['./add-book-form.component.css']
})

export class AddBookFormComponent implements OnInit {

    bookCreateRequest: IBookAddEditRequest = {};  
    books: IBook[] = [];
    authors: IAuthor[] = [];

    constructor(
        private _dialogDisplayService: DialogDisplayService,
        private _userService: UserService 
    ) { 

    }

    ngOnInit() {
        this.bookCreateRequest = {
            title: "",
            authorId: null,
            page_no: null,
            lang: "",
            gendre: "",
            lit: "",
            copies_no: null
        };
        this.loadAuthors();
    }

    addBook(createRequest: IBookAddEditRequest, isValid: boolean, form:NgForm) {
        if (isValid) {
            this._userService.createBook(createRequest)
                .subscribe(
                    data => {
                        alert("Book added successfully!");
                        this.loadBooks();
                    },
                    error => {
                        console.log("error API Add Book: ", error);
                        alert("ERROR: Book couldn't be added!");
                    }
                );
                this._dialogDisplayService.hideDialog();
        } else {
            console.log("ERROR Adding Book!");
        }
        form.reset();
    }

    loadBooks(){
        this._userService.getAllBooks()
            .subscribe(
                data => {
                    this.books = data;
                },
                error => {
                    console.log("error loading books API: ", error);
                    alert("ERROR: Books couldn't be loaded!");
                }
            );
    }

    loadAuthors(){
        this._userService.getAllAuthors()
            .subscribe(
                data => {
                    this.authors = data;
                },
                error => {
                    console.log("ERROR: Authors couldn't be loaded: ", error);
                    alert("ERROR: Authors couldn't be loaded!");
                }
            );
    }
}
