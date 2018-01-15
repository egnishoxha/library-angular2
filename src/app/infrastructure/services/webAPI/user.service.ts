import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

import { User } from "./../../../dataModel/User";
import { IBook } from "./../../../dataModel/Book";
import { IAuthor } from "./../../../dataModel/Author";

import { IUserSearchRequest } from "./../../../infrastructure/services/webAPI/UserSearchRequest";
import { IBookAddEditRequest } from "./../../../infrastructure/services/webAPI/BookAddEditRequest";
import { IAuthorAddEditRequest } from "./../../../infrastructure/services/webAPI/AuthorAddEditRequest";


@Injectable()
export class UserService{
    private _data: any;

    constructor(
        private http: Http
    ){

    }

    //Users
    getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }
    createUser(user: IUserSearchRequest){
        return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
    }
    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }
    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }
    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt())
            .map((response: Response) => response.json());
    }

    //New Functions: Books
    getAllBooks() {
        return this.http.get('/api/books', this.jwt()).map((response: Response) => response.json());
    }
    getBookById(id:number){
        return this.http.get('/api/books/' + id, this.jwt()).map((response: Response) => response.json());
    }
    getAllBooksByAuthor(id:number) {
        return this.http.get('/api/books' + id, this.jwt()).map((response: Response) => response.json());
    }
    createBook(book: IBookAddEditRequest){
        return this.http.post('/api/books', book, this.jwt()).map((response: Response) => response.json());        
    }
    deleteBook(id: number) {
        return this.http.delete('/api/books/' + id, this.jwt()).map((response: Response) => response.json());
    }
    updateBook(id: number, editRequest: IBookAddEditRequest) {
        return this.http.put('/api/books/' + id, editRequest, this.jwt()).map((response: Response) => response.json());
    }

    //New Functions: Authors
    getAllAuthors(){
        return this.http.get('/api/authors', this.jwt()).map((response: Response) => response.json());        
    }
    createAuthor(author: IAuthorAddEditRequest){
        return this.http.post('/api/authors', author, this.jwt()).map((response: Response) => response.json());        
    }
    deleteAuthor(id: number) {
        return this.http.delete('/api/authors/' + id, this.jwt()).map((response: Response) => response.json());
    }
    updateAuthor(id: number, editRequest: IAuthorAddEditRequest) {
        return this.http.put('/api/authors/' + id, editRequest, this.jwt()).map((response: Response) => response.json());
    }

    //JWT function
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}