import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ConfirmDialogModule, ConfirmationService } from "primeng/primeng";

import { User } from "../../dataModel/User";
import { IBook } from "../../dataModel/Book";
import { IAuthor } from "../../dataModel/Author";

import { UserService } from './../../infrastructure/services/webAPI/user.service';
import { DialogDisplayService } from "../../infrastructure/services/clientAPI/dialog-display.service";
import { IBookAddEditRequest } from "./../../infrastructure/services/webAPI/BookAddEditRequest";

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {

    books:IBook[] = [];
    authors:IAuthor[] = [];
    users:any[] = [];
    selectedAuthor: Object = {};
    currentUser: User;
    bookEditRequest: IBookAddEditRequest = {};  
    bookId: number;

    constructor(
        public _userService: UserService,        
        public _dialogDisplayService: DialogDisplayService,
        public _confirmationService: ConfirmationService
        
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));    
  }

    ngOnInit() {
        this.loadBooks();
        this.loadAuthors();
    }
    
    //edit dialog
    displayEdit: boolean = false;

    onChangeAuthor(authorData){
        if (typeof authorData.id === "undefined") {
            //case where 'Choose Author' selected, load all books, clean search
            this.loadBooks();
        } else {
            this.loadBooksByAuthor(authorData.id);
        }
    }

    loadAuthors(){
        this._userService.getAllAuthors()
        .subscribe(
            (authors: IAuthor[]) => { this.authors = authors; console.log("load authors API: ", this.authors); },
            (error) => { alert("ERROR: Author couldn't be loaded!"); }
        );
    }

    loadBooks(){
        this._userService.getAllBooks()
            .subscribe(
                (books: IBook[]) => { this.books = books; },
                (error) => { alert("ERROR: Books couldn't be loaded!"); }
            );
    }

    loadBooksByAuthor(authorId){
        this.books = this.books.filter(x => x.authorId === authorId);
    }

    //hide EDIT dialog
    hideEditDialog() {
        this.displayEdit = false;
    }

    //save book
    saveBook(form: NgForm) {
        if (form.valid) {
            this._userService.updateBook(this.bookId, this.bookEditRequest)
                .subscribe(
                    data => {
                        alert("Book updated  successfully!");
                        this.loadBooks();                      
                    },
                    error => {
                        console.log("error API Update book: ", error);
                        alert("ERROR: Book couldn't be updated!");
                    }
                );
            this.displayEdit = false;
        }
    }

    bookCommands(type, book){
        if(type == "edit" && book != null){
            this.bookId = book.id;
            this.bookEditRequest = {
                title: book.title,
                authorId: book.authorId,
                page_no: book.page_no,
                lang: book.lang,
                gendre: book.gendre,
                lit: book.lit,
                copies_no: book.copies_no
            };        
            this.displayEdit = true;
        }else if(type == "del" && book != null){
            this._confirmationService.confirm({
                message: `Are you sure you want to remove <b>${book.title}</b>?`,
                accept: () => {
                    this._userService.deleteBook(book.id)
                    .subscribe(
                        data => {
                            console.log("Book deleted successfully!");
                            alert("Book deleted successfully!");
                            this.loadAuthors();                      
                        },
                        error => {
                            console.log("error API Delete Book: ", error);
                            alert("ERROR: Book couldn't be deleted!");
                        }
                    );
                }
            });
        }else{
            alert("NOT Known Command!");
        }
    }
}
