/*****
    The fake-backend is based on this post and modified accordingly to my specific needs

    http://jasonwatmore.com/post/2017/02/22/mean-with-angular-2-user-registration-and-login-example-tutorial

*****/


import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
    // array in local storage for registered users
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
    let books: any[] = JSON.parse(localStorage.getItem('books')) || [];
    let authors: any[] = JSON.parse(localStorage.getItem('authors')) || [];

    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        // wrap in timeout to simulate server api call
        setTimeout(() => {

            // authenticate
            if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                // get parameters from post request
                let params = JSON.parse(connection.request.getBody());

                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.userName === params.userName && user.password === params.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {
                            id: user.id,
                            userName: user.userName,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            token: 'fake-jwt-token'
                        }
                    })));
                } else {
                    // else return 400 bad request
                    connection.mockError(new Error('Username or password is incorrect'));
                }

                return;
            }

            // get users
            if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: users })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }

            // get user by id
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    // respond 200 OK with user
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: user })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }

            // create user
            if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Post) {
                // get new user object from post body
                let newUser = JSON.parse(connection.request.getBody());
                console.log("new User: ", newUser);

                // // validation
                console.log("users length: ", users.length);
                let duplicateUser = users.filter(user => { return user.userName === newUser.userName; }).length;
                if (duplicateUser) {
                    return connection.mockError(new Error('Username "' + newUser.userName + '" is already taken'));
                }
                                
                // save new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK
                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                return;
            }

            // delete user
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }


            //get books
            if(connection.request.url.endsWith('/api/books') && connection.request.method === RequestMethod.Get){
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: books })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }
            // get book by id
            if (connection.request.url.match(/\/api\/books\/\d+$/) && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedBooks = books.filter(book => { return book.id === id; });
                    let book = matchedBooks.length ? matchedBooks[0] : null;

                    // respond 200 OK with user
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: book })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }
            // get books by author id
            if (connection.request.url.match(/\/api\/books\/\d+$/) && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedBooks = books.filter(book => { return book.authorId === id; });
                    books.push(matchedBooks);
                    console.log("filteres books: ", books);
                    //let user = matchedBooks.length ? matchedBooks[0] : null;

                    // respond 200 OK with user
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: books })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }
            // create book
            if (connection.request.url.endsWith('/api/books') && connection.request.method === RequestMethod.Post) {
                // get new user object from post body
                let newBook = JSON.parse(connection.request.getBody());
               
                // // validation
                let duplicateBook = books.filter(book => { return book.title === newBook.title; }).length;
                if (duplicateBook) {
                    return connection.mockError(new Error('Book title "' + newBook.title + '" is already taken'));
                }
            
                // save new user
                newBook.id = books.length + 1;
                for(var prop in authors){
                    if(authors[prop]["id"] == newBook.authorId){
                        newBook.author = authors[prop];
                    }
                }
                books.push(newBook);
                localStorage.setItem('books', JSON.stringify(books));

                // respond 200 OK
                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                return;
            }
            // delete book
            if (connection.request.url.match(/\/api\/books\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find author by id in authors array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < books.length; i++) {
                        let book = books[i];
                        if (book.id === id) {
                            // delete author
                            books.splice(i, 1);
                            localStorage.setItem('books', JSON.stringify(books));
                            break;
                        }
                    }

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }
            // edit book
            if (connection.request.url.match(/\/api\/books\/\d+$/) && connection.request.method === RequestMethod.Put) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    let modifiedBook = JSON.parse(connection.request.getBody());
                    
                    // find author by id in authors array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < books.length; i++) {
                        let currentBook = books[i];
                        if (currentBook.id === id) {
                            // edit book
                            currentBook.title = modifiedBook.title;
                            currentBook.authorId = modifiedBook.authorId;
                            currentBook.page_no = modifiedBook.page_no;
                            currentBook.lang = modifiedBook.lang;
                            currentBook.gendre = modifiedBook.gendre;
                            currentBook.lit = modifiedBook.lit;
                            currentBook.copies_no = modifiedBook.copies_no;
                            for(var prop in authors){
                                if(authors[prop]["id"] == currentBook.authorId){
                                    currentBook.author = authors[prop];
                                }
                            }
                            localStorage.setItem('books', JSON.stringify(books));
                            break;
                        }
                    }

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }



            /***********  OK Authors  ***********/
            
            //get authors
            if(connection.request.url.endsWith('/api/authors') && connection.request.method === RequestMethod.Get){
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: authors })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }
            // create author
            if (connection.request.url.endsWith('/api/authors') && connection.request.method === RequestMethod.Post) {
                // get new author object from post body
                let newAuthor = JSON.parse(connection.request.getBody());
                
                // // validation
                let duplicateAuthor = authors.filter(author => { return author.fullName === (newAuthor.firstName + " " + newAuthor.lastName) }).length;
                console.log("duplicated Author: ", duplicateAuthor);
                if (duplicateAuthor) {
                    return connection.mockError(new Error('Author "' + newAuthor.firstName + '" is already taken'));
                }
                 
                // save new user
                newAuthor.id = authors.length + 1;
                newAuthor.fullName = newAuthor.firstName + " " + newAuthor.lastName;
                authors.push(newAuthor);
                localStorage.setItem('authors', JSON.stringify(authors));
                // respond 200 OK
                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                return;
            }
            // delete author
            if (connection.request.url.match(/\/api\/authors\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find author by id in authors array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < authors.length; i++) {
                        let author = authors[i];
                        if (author.id === id) {
                            // delete author
                            authors.splice(i, 1);
                            localStorage.setItem('authors', JSON.stringify(authors));
                            break;
                        }
                    }

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }
            // edit author
            if (connection.request.url.match(/\/api\/authors\/\d+$/) && connection.request.method === RequestMethod.Put) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    let modifiedAuthor = JSON.parse(connection.request.getBody());
                    
                    // find author by id in authors array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < authors.length; i++) {
                        let currentAuthor = authors[i];
                        if (currentAuthor.id === id) {
                            // edit author
                            currentAuthor.firstName = modifiedAuthor.firstName;
                            currentAuthor.lastName = modifiedAuthor.lastName;
                            currentAuthor.lang = modifiedAuthor.lang;
                            currentAuthor.nationality = modifiedAuthor.nationality;
                            currentAuthor.gendre = modifiedAuthor.gendre;
                            currentAuthor.fullName = currentAuthor.firstName + " " + currentAuthor.lastName;
                            localStorage.setItem('authors', JSON.stringify(authors));
                            break;
                        }
                    }

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }

            // pass through any requests not handled above
            let realHttp = new Http(realBackend, options);
            let requestOptions = new RequestOptions({
                method: connection.request.method,
                headers: connection.request.headers,
                body: connection.request.getBody(),
                url: connection.request.url,
                withCredentials: connection.request.withCredentials,
                responseType: connection.request.responseType
            });
            realHttp.request(connection.request.url, requestOptions)
                .subscribe((response: Response) => {
                    connection.mockRespond(response);
                },
                (error: any) => {
                    connection.mockError(error);
                });

        }, 500);

    });

    return new Http(backend, options);
};

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions, XHRBackend]
};