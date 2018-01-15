import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { User } from "../../dataModel/User";
import { IUserSearchRequest } from "./../../infrastructure/services/webAPI/UserSearchRequest";
import { UserService } from './../../infrastructure/services/webAPI/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    returnUrl: string;
    private user: User;
    private userSearchRequest: IUserSearchRequest = {};

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _userService: UserService    
    ) { 
        
    }

    ngOnInit() {
        //Set return url
        this.returnUrl = this._route.snapshot.queryParams["returnUrl"] || "";
        this.userSearchRequest = {
            userName: "",
            password: ""
        }
    }

    register(searchRequest: IUserSearchRequest, isValid: boolean, form: NgForm) {
        if (isValid) {        
            this._userService.createUser(searchRequest)
            .subscribe(
                data => {
                    this._router.navigate(['/login']);
                },
                error => console.log("Error Registering New User: ", error)
            );
        } else {
            console.log("Unknown error!");
            alert("Unknown error!");
        }
        form.reset();
    }
}
