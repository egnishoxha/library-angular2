import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { ConfirmDialogModule, ConfirmationService } from "primeng/primeng";

import { User } from "../../../dataModel/User";
import { IBook } from "../../../dataModel/Book";
import { IAuthor } from "../../../dataModel/Author";

import { UserService } from './../../../infrastructure/services/webAPI/user.service';
import { DialogDisplayService } from "../../../infrastructure/services/clientAPI/dialog-display.service";
import { IBookAddEditRequest } from "./../../../infrastructure/services/webAPI/BookAddEditRequest";

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    styleUrls: ['./book-detail.component.css']
})

export class BookDetailComponent implements OnInit {

    book: IBook;
    currentUser: User;
    bookImg: string;
    val: boolean;

    constructor(
        public _route: ActivatedRoute,
        public _router: Router,
        public _userService: UserService,        
        public _dialogDisplayService: DialogDisplayService,
        public _confirmationService: ConfirmationService
    ) { 
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.val = false;
        if (this._route.snapshot.paramMap.get("id") != null) {
            this.bookImg = "./assets/images/book_img.png";
            let bookId = +this._route.snapshot.paramMap.get("id"); // + converts string to number
            console.log("bookId: ", bookId);
    
            this._userService.getBookById(bookId).subscribe(
                (book: IBook) => { this.book = book; console.log("loaded book: ", this.book); },
                (error) => { alert("ERROR: Book couldn't be loaded!"); }
            );

        }else{
            alert("The selected book couldn't be found!");
        }
    }
}
