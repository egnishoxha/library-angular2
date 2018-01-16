import {Routes, RouterModule} from "@angular/router";

import { AuthGuard } from "./auth.guard";
import { Constants } from "./../../infrastructure/constants";

import { RegisterComponent } from './../../components/register/register.component';
import { LoginComponent } from "./../../components/login/login.component";
import { BooksComponent } from "./../../components/books/books.component";
import { BookDetailComponent } from "./../../components/books/book-detail/book-detail.component";
import { AuthorsComponent } from "./../../components/authors/authors.component";
import { HomeComponent } from "./../../components/home/home.component";

const appRoutes: Routes = [
    { path: "login", component: LoginComponent },
    { path: 'register', component: RegisterComponent }, 
    { path: "books", component: BooksComponent, canActivate: [AuthGuard]},  
    { path: "authors", component: AuthorsComponent, canActivate: [AuthGuard] },
    {
        path: "books/:id", component: BookDetailComponent, canActivate: [AuthGuard]
    },
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
    },
    { path: "**", redirectTo: "/login" }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true, enableTracing: false });
